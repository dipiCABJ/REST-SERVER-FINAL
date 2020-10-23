const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../MODELS/user');
const app = express();


app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: '(Usuario) o Contraseña incorrectos'
                    }
                });
            }
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (Contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: userDB
        }, process.env.SEED_AUTENTICATION, { expiresIn: process.env.FECHA_VEN_TOKEN });

        res.json({
            ok: true,
            userDB,
            token
        });
    })

})






module.exports = app;