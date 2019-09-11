let mongoose = require('mongoose');
let Category = mongoose.model('Category');


module.exports = {
    index: function(req, res){
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
    },

    new: function(req, res){
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
    }
}