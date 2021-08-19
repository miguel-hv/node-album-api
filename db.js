const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/albums_api';
const DB_CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connect = ()=> {    
    mongoose.connect(DB_URL, DB_CONFIG)
    .then(res => {
        mongoose.set('useFindAndModify', false);
        const { name, host } = res.connection;
        console.log(`Successfully connected to ${name} in ${host}`);
    })
    .catch(error => {
        // console.error(error);
        console.log('Error connecting to db: ', error);
    });
}

module.exports = {DB_URL, DB_CONFIG, connect};