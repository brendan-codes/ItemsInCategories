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


// models
let categorySchema = new Schema({
    name: {type: String, required: true},
    desc: String,
    _items: [{type: Schema.Types.ObjectId, ref: "Item"}]
}, {collection: 'catagories'});

let itemSchema = new Schema({
    name: {type: String, required: true},
    _category: {type: Schema.Types.ObjectId, ref: "Category"}
});

let Category = mongoose.model("Category", categorySchema);
let Item = mongoose.model("Item", itemSchema);


app.get('/', (req, res) => {
    Category.find({})
    .populate("_items")
    .exec()
    .then(categories => {
        console.log(categories);
        res.render('index', {categories: categories});
    })
    .catch(err => {
        console.log(err);
        res.render('index', {err: err});
    })
});

app.post('/categories', (req, res) => {
    let post = {
        name: req.body.name,
        desc: req.body.desc
    };
    let newCat = new Category(post);
    newCat.save()
    .then(data => {
        console.log(data);
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
        res.redirect('/');
    })
});

app.post('/items/:category_id', (req, res) => {
    Category.findOne({_id: req.params.category_id})
    .then(category => {
        if(!category){
            res.redirect('/');
        };

        let item_post = {
            name: req.body.name
        };
        let newItem = new Item(item_post);
        newItem._category = category._id;
        category._items.push(newItem._id);

        category.save()
        .then(data => {
            newItem.save()
            .then(data => {

                res.redirect('/');
            })
            .catch(err => {
                // error handling for saving item
                console.log(err);
                res.redirect('/');
            })
        })
        .catch(err => {
            // error handling for saving category
            console.log(err);
            res.redirect('/');
        })
    })
    .catch(err => {
        // error handling for find cat by id
        console.log(err);
        res.redirect('/');
    });
})

// listen
app.listen(8002, function(){
    console.log("items in categories")
})