const path = require('path')
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./controllers')
const helpers = require('./utils/helpers')

// grab sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars + helpers
const handlebars = exphbs.create({helpers});

// express session and sequelize session
const sess = {
    secret: 'very secret secret',
    cookie: {
        maxAge:300000,
        httpOnly: true,
        secure:false,
        sameSite: 'strict'
    },
    resave:false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// use the defined session
app.use(session(sess));

// use handlebars for front-end
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// standard server setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, () => console.log('Now listening'));
});