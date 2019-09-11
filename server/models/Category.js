let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: {type: String, required: true},
    desc: String,
    _items: [{type: Schema.Types.ObjectId, ref: "Item"}]
}, {collection: 'catagories'});

mongoose.model("Category", categorySchema);