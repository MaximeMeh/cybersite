module.exports = app => {
    const freezbes = require("../controllers/freezbe.controller.js");
  
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", freezbes.create);
  
    // Retrieve all Tutorials
    router.get("/", freezbes.findAll);

  
    app.use('/api/freezbes', router);
  };