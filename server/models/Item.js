let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let itemSchema = new Schema({
    name: {type: String, required: true},
    _category: {type: Schema.Types.ObjectId, ref: "Category"}
});

let Item = mongoose.model("Item", itemSchema);