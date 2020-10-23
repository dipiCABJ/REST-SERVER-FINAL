const jwt = require('jsonwebtoken');

//Verificar Token
let VerificaToken = (req, res, next) => {
    let token = req.get('Authorization');

    //console.log(token);

    jwt.verify(token, process.env.SEED_AUTENTICATION, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    })
}

let VerificaRoleAdmin = (req, res, next) => {
    let user = req.usuario;
    //console.log(user.role);
    //console.log(user);
    if (user.role != 'Administrador') {
        return res.json({
            ok: false,
            err: {
                message: "El Usuario no es Administrador"
            }
        });
    }
    next();
}


module.exports = {
    VerificaToken,
    VerificaRoleAdmin
}