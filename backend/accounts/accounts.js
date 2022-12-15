const express = require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser");
// const cors = require("cors");

//database mysql
const db = require("./config/database");

//test database connection
try {
  db.authenticate().then(()=>{
    console.log("Connecté à la base de données MySQL!");
    const app = express();
    // app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(require('./routes/routes'));
    const port = 3000; //setup port

    // PORT
    app.listen(port, () => {
      console.log(`Up and Running on port ${port} - This is Account service`);
    });
  });
  
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}






