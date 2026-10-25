const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a fridge item name"],
        },
        roommate: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            // default: 1 //is it right to have it default to 0 vs 1? Since when you add it, it'll be at least 1
        },
        description: {
            type: String,
            required: false,
        },
        expirationDate: {
            type: Date,
        },
        category: {
            type: String, 
            required: true,
            emun: ['fruit', 'protein', 'vegetable', 'leftovers', 'dairy', 'sauces', 'other']
        }
    },
    {
        timestamps: true
    }
);

//getters
ProductSchema.virtual('displayDate').get(function () { //needs to be displayDate to work (idk why) this is a getter function
  return this.expirationDate.toLocaleDateString('en-US', { timeZone: 'UTC' });
});

const Product = mongoose.model("fridgeitem", ProductSchema);

// create the model for users and expose it to our app
module.exports = Product;