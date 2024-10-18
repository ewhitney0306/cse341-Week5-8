const routes = require('express').Router(); 

const myController = require ('../controllers');

routes.use('/character', require('./character'));

module.exports = routes;