const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
.then(() => {
    console.log('Connected to MongoDB successfully');
})
.catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});

module.exports = mongoose;