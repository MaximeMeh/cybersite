const db = require("../models");
const Freezbe = db.freezbes;
const Op = db.Sequelize.Op;


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const freezbe = {
        freezbeName: req.body.freezbeName,
        freezbeDescription: req.body.freezbeDescription,
        puht: req.body.description,
        freezbeRange: req.body.freezbeRange,
    };

    // Save Tutorial in the database
    Freezbe.create(freezbe)
        .then(data => {
          res.send(data);
          console.log(data);
        })
        .catch(err => {
          res.status(500).send({
              message:
              err.message || "Some error occurred while creating the Tutorial."
        });
        });
};



// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const freezbeName = req.query.freezbeName;
    var condition = freezbeName ? { freezbeName: { [Op.like]: `%${freezbeName}%` } } : null;
  
    Freezbe.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving freezbes."
        });
      });

    // Freezbe.findAll().then(res => {
    //     console.log(res)
    //   }).catch((error) => {
    //     console.error('Failed to retrieve data : ', error);
    //   });
};




// sequelize.sync().then(() => {
//   console.log('Book table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });
 