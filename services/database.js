const mongoose = require('mongoose')
let count = 0;

const connectDB = () => {
    console.log('Connecting to MongoDB');
    mongoose.connect('mongodb://localhost:27017/contacts').then(() =>{
        console.log('MongoDB is connected')
    }).catch((err) => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectDB, 5000);
    })
};

module.exports = connectDB;