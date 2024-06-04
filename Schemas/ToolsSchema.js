const mongoose = require("mongoose");

const toolsSchema = new mongoose.Schema({
    id: Number, 
    name: String,
    image: String,
    description: String,
    detailed_description: String,
    price: Number,
    stock: Number,
});

module.exports = mongoose.model("Tools", toolsSchema);  