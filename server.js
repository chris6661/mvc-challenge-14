const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');

// pass helpers file into handlebars
const hbs = exphbs.create({ helpers });

// allows connecting to backend
const session = require('express-session');

// stores sessions into database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// sets up Express.js session and connects session to Sequelize database
const sess = {
    secret: 'Super secret secret',
    rolling: true,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 10000, // 10 minutes
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// initialize express
const app = express();
const PORT = process.env.PORT || 3001;

// express middleware - executes before sending response back to client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// give access to static files in public folder
app.use(express.static(path.join(__dirname, 'public')));
// setup express to use handlebars as template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// use sessions - must be above routes
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server - sync models
// force: false stops from dropping tables each time
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});