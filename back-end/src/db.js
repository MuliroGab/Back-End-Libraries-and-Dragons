const mongoose = require('mongoose');

const DB_User = "gabrielmurillo";
const DB_Password = encodeURIComponent("uFA9ncteL1of6WE6");

  console.log("Agora vai")
  mongoose.connect(`mongodb+srv://${DB_User}:${DB_Password}@cluster0.utnvina.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log("Conectado"))
  .catch((error) => console.log(error))