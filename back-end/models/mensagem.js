const mongoose = require('mongoose');

const mensagem = mongoose.model('mensagem',{
    titulo: String,
    mensagem: String

});

module.exports = mensagem;