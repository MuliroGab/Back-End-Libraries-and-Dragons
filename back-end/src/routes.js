const express = require('express')
const mongoose = require('mongoose');
const usuario = require('../models/usuarios');
const livro = require('../models/Livros');
const mensager = require('../models/mensagem');
const db = require('./db');
const multer  = require('multer');
const fs = require('fs').promises;

const routes = express.Router();
routes.use("/files",express.static("files"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() 
    cb(null, uniqueSuffix + file.originalname);
  }
})

const upload = multer({ storage: storage })

routes.delete('/deletePdf/:fileName', async (req, res) => {
  const pdfFileName = req.params.fileName;

  const filePath = `./files/${pdfFileName}`;

  try {
    await fs.unlink(filePath);

    // Implemente a lógica para remover o registro do arquivo no banco de dados, se aplicável

    await livro.findOneAndDelete({ pdf: pdfFileName });
    res.status(200).json({ message: 'Arquivo PDF excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir o arquivo PDF', error);

    // Responda com erro
    res.status(500).json({ message: 'Erro ao excluir o arquivo PDF.' });
  }
});
routes.get('/login', async (req, res) => {
    try {
      const userse = await usuario.find()
      res.status(200).json(userse)
    }
    catch (error) {
      res.status(500).json({ error: error })
    }
  });

  routes.get('/forum', async (req, res) => {
    try {
        await mensager.find({}).then((data) => {
        res.send({status:200, data: data})
      });
    }
    catch (error) {
      res.status(500).json({ error: error })
    }
  });

routes.get('/', async (req, res) => {
    try {
      const users = await usuario.find()
      res.status(200).json(users)
    }
    catch (error) {
      res.status(500).json({ error: error })
    }
  });

  routes.get('/getfiles', async (req, res) => {
    try {
        await livro.find({}).then((data) => {
        res.send({status:200, data: data})
      });
    }
    catch (error) {
      res.status(500).json({ error: error })
    }
  });
  
  routes.post('/', async (req, res) => {
    const { nome, sobrenome, email, senha, confirmacaosenha } = req.body;
    const user = {
      nome,
      sobrenome,
      email,
      senha
    }
  
    try {
      if (await usuario.findOne({ email:req.body.email })) {
        res.status(401).json({ error: 'Email já cadastrado' })
      }
      else if (senha != confirmacaosenha) {
        res.status(400).json({ error: 'Senha e confirmação da senha são diferentes!' })
      }
      else{
        await usuario.create(user)
        res.status(200).json(user)
      }
      
    } catch (error) {
      res.status(500).json({ error: error })
    }
  });

  routes.post('/forum', async (req, res) => {
    
    const titulo = req.body.titulo;
    const mensagem = req.body.mensagem;
    const user = {
      titulo,
      mensagem
    }
      console.log(titulo,mensagem)
    try {
      await mensager.create(user)
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  });


routes.post('/login' , async (req,res) => {
    console.log('Dados recebidos no servidor:', req.body);
  
    try {
      const user = await usuario.findOne({email:req.body.email});
      if (user && user.senha === req.body.senha) {
        res.status(200).json(user)
        console.log("usuario encontrado");
      }
  
      else {
        return res.status(401).json({ error: 'Email ou senha incorreta' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
});

routes.post("/uploadfiles", upload.single("file"), async(req,res)=>{
  console.log(req.file);
  const title = req.body.title;
  const filename = req.file.filename;

  try {
    await livro.create({titulo:title,pdf:filename});
    res.status(200).json()
  }
  catch (error) {
    res.status(500).json({ error: error });
  }

  

});

module.exports = routes;