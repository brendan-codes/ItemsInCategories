let mongoose = require('mongoose');
let Category = mongoose.model('Category');
let Item = mongoose.model('Item');

module.exports = {
    index: function(req, res){

    },
    new: function(req, res){
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
    }
}