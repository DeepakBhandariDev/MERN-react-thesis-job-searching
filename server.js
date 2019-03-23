const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const vacs = require('./routes/api/vacs');



app.use(express.json());


const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api/vacs', vacs);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ' + port ));