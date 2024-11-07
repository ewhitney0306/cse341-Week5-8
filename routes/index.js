const routes = require('express').Router(); 

const myController = require ('../controllers');

routes.use('/character', require('./character'));
routes.use('/location', require('./location'));
routes.use('/', require('./auth'));


module.exports = routes;