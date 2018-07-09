const mongoose = require('mongoose');
const UserSchema = require('./userModel')
var FoodSchema = new mongoose.Schema({
    dish: {
        type: String, 
        required: [true, "Dish name is required."], 
        minlength: [3, "Dish name must be at least 3 characters."]
    },
    pic: {
        type: String, 
        required: [true, "Picture is required."], 
    },
    price: {
        type: Number, 
        required: [true, "Price is required."], 
        min: [1, "Price must be at least $1"]
    },
    quan: {
        type: Number, 
        required: [true, "Quantity is required."], 
        minlength: [1, "Quantity must be at least 1 character."]
    },
    zip: {
        type: Number, 
        required: [true, "Zip Code is required."], 
        minlength: [5, "Zip Code must be at least 5 characters."]
    },
    desc: {
        type: String, 
        required: [true, "Description is required."], 
        minlength: [3, "Description must be at least 3 characters."]
    },
    exp: {
        type: Date, 
        required: [true, "Expiration date is required."]
    },
    cook: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
}, {timestamps: true})

module.exports = mongoose.model('Food', FoodSchema)