const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const cookieSession = require('cookie-session');

const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('./services/passport');

var app = express();

app.use(cookieSession ({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));

app.use((req, res, next) => {
        if (req.session && !req.session.regenerate){
            req.session.regenerate = (cb) => {
                cb();
            }
        }
        if(req.session && !req.session.save){
            req.session.save = (cb) => {
                cb();
            }
        }
        next();
    });

app.use(passport.initialize());
app.use(passport.session());  

const port = process.env.PORT || 8080;

app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));


process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log (`Connected to DB and listening on ${port}`);
    }
});