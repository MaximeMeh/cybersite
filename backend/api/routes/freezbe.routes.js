module.exports = app => {
    const freezbes = require("../controllers/freezbe.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", freezbes.findAll);

  
    app.use('/api/freezbes', router);
  };