const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
require('./CONFIG/cfg.js');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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