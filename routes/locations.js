var express = require('express');
var router = express.Router();
const moment = require("moment")
module.exports = function (app, models) {
  //index
  app.get('/', (req, res) => {
    models.Location.findAll().then(locations => {
      res.render('index', {locations});
    })
  })
  //New
  app.get('/locations/new', (req, res) => {
    res.render('locations-new', {});
  })
  //create
  app.post('/locations', (req, res) => {
    console.log(req.body)
    models.Location.create(req.body).then(locations => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
    });
  })



  //Edit

  //Update

  //Show
  app.get('/locations/:id', (req, res) => {
      models.Location.findByPk(req.params.id, //{ include: [{ model: models.Rsvp }] }
      ).then((locations) => {
         //let createdAt = location.createdAt;
        //  createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        //  location.createdAtFormatted = createdAt;
          res.render('locations-more', {locations});
      }).catch((err) => {
          console.log(err.message);
      })
  });
  //Delete
}
