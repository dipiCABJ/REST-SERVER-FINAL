const express = require('express');
const User = require('../MODELS/user');
const { VerificaToken, VerificaRoleAdmin } = require('../MIDDLEWARES/autentication')

const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

app.get('/usuario', VerificaToken, (req, res) => {

    let from = req.query.from || 0;
    let limit = req.query.limit || 10;
    let status = req.query.status || true;
    from = Number(from);
    limit = Number(limit);


    User.find({ status: status })
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            User.countDocuments({ status: status }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    count
                });
            })
        })
});

app.post('/usuario', [VerificaToken, VerificaRoleAdmin], (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usr: userDB
        });
    })
});

app.put('/usuario/:id', [VerificaToken, VerificaRoleAdmin], (req, res) => {
    let body = req.body
    let id = req.params.id;
    body = _.pick(req.body, 'nombre', 'email', 'img', 'role', 'estado');
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: userDB
        });
    })
});

app.delete('/usuario/:id', [VerificaToken, VerificaRoleAdmin], (req, res) => {
    let id = req.params.id;
    let field = {
        status: false
    };

    User.findByIdAndUpdate(id, field, { new: true }, (err, deleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!deleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: deleted
        });
    });
});

module.exports = app;