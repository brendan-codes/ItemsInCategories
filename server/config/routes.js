let categories = require('./../controllers/categories.js');
let items = require('./../controllers/items.js');

module.exports = function(app){

    app.get('/', categories.index);
    app.post('/categories', categories.new);
    app.post('/items/:category_id', items.new);


}