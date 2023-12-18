const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const multer  = require('multer');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(multer);
app.use("/files",express.static("files"));


app.get('/', (req,res) =>{
    res.send('Hello word');
})

app.listen(3000, ()=>{
    console.log("escutando porta 3000");
});