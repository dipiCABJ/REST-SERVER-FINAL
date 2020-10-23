const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let ValidRoles = {
    values: ['Administrador', 'Usuario'],
    message: '{VALUE} no es un rol valido!'
}

let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido!']
    },
    password: {
        type: String,
        required: [true, 'La Contraseña es requerida!']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'Usuario',
        enum: ValidRoles
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userBO = user.toObject();
    //delete userBO.password;

    return userBO;
};

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico!' });
module.exports = mongoose.model('Usuario', userSchema);