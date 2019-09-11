// globals
const express  = require('express'), // express
      session  = require('express-session'), // express session
      path     = require('path'), // path fixes file paths
      flash    = require('express-flash'), // adds flash middleware
      mongoose = require('mongoose'); // adds mongoose
      Schema   = mongoose.Schema; // define Schema variable

let app = express(); // create express instance

// flash n' session
app.use(flash());
app.use(session({
    secret: 't0t4llys3cr3tp4ssw0rd',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// static content
app.use(express.static(path.join(__dirname, '/static')));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// post and json encoding
app.use(express.urlencoded());
app.use(express.json());

// connect to mongodb
mongoose.connect("mongodb://localhost/items-categories", {useNewUrlParser: true, useUnifiedTopology: true})




app.get('/', (req, res) => {
    res.render('index');
})


// listen
app.listen(8002, function(){
    console.log("items in categories")
})