const express = require('express');
const app = express();
const { Joke } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  try {
 
 
    const tags = req.query.tags;
    const content = req.query.content;
 
 
    let jokes = await Joke.findAll();
 
 
    if (tags) {
      jokes = jokes.filter(j => j.tags.includes(tags));
    }
 
 
    if (content) {
      jokes = jokes.filter(j => j.joke.includes(content));
    }
 
 
    res.send(jokes);
 
 
  } catch (error) {
 
 
    console.error(error);
    next(error)
 
 
  }
 });
 
 
 app.get('/jokes/:tags', async (req, res, next) => {
  try {
 
 
    let jokes = await Joke.findAll({ where: { tags: req.params.tags } });
    res.send(jokes);
 
 
  } catch (error) {
 
 
    console.error(error);
    next(error)
 
 
  }
 });
 
 
 app.get('/jokes/:content', async (req, res, next) => {
  try {
 
 
    let jokes = await Joke.findAll();
    jokes = jokes.filter(joke => joke.includes(req.params.content));
    res.send(jokes);
 
 
  } catch (error) {
 
 
    console.error(error);
    next(error)
 
 
  }
 });
 
 

// we export the app, not listening in here, so that we can run tests
module.exports = app;
