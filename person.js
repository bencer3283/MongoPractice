let mongoose = require('mongoose');

let personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        validate: (value) => {
            return value >= 0;
        }
    },
    favoriteFoods: [String]
});

module.exports = mongoose.model('Person', personSchema);