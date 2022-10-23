const path = require('path')
const express = require('express')
const session = require('express-session')
const routes = require('./controllers')
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars + helpers
const handlebars = exphbs.create({helpers});

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

app.use(session(sess));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(expres.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, () => console.log('Now listening'));
});