const express = require ('express');
const passport = require('passport');
const Router = express.Router();

const auth = require('../controllers/auth');

Router.get("/", (req, res) => {
    if(req.user){
        res.send(`Welcome ${req.user.displayName} you are logged in`);
    } else {
        res.json({message: "You are not logged in"});
    }    
});

Router.get("/failed", (req, res) => {
    res.send("Failed");
});

Router.get('/success', auth, (req, res) => {
    res.send(`Welcome ${req.user.displayName}`);
});

Router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

Router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/failed',
}),
    function (req, res) {
        res.redirect('/api-docs');
    }
);

Router.get('/logout', (req, res, next) =>{
    req.logOut(function (err){
        if(err){ return next(err); }
        res.redirect('/');
    })
});

module.exports = Router;