const mongoose = require('mongoose');

const usuario = mongoose.model('usuario',{
    nome: String,
    sobrenome: String,
    email: String,
    senha: String

});

module.exports = usuario;