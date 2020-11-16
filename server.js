const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const { use } = require('./ROUTES/user.js');
const path = require('path');
require('./CONFIG/cfg.js');
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.json());



app.use(bodyParser.json());

//HABILITAR PUBLIC
app.use(express.static(path.resolve(__dirname, './PUBLIC')));
//console.log(__dirname + '../PUBLIC');
//console.log(path.resolve(__dirname, '../PUBLIC'));


app.use(require('./ROUTES/index.js'));

mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('Base de datos OnLine!!');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el Puerto: ', process.env.PORT);
})