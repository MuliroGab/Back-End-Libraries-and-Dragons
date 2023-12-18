const mongoose = require('mongoose');

const livro = mongoose.model('livros1',{
    titulo: String,
    pdf: String
});

module.exports = livro;