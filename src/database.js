const mongoose = require('mongoose');

const URI = process.env.MONGOOSE_URL
    ? process.env.MONGOOSE_URL
    : 'mongodb://localhost/escuelita';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database is connected');
});