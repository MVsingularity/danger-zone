var express = require('express');
var router = express.Router();
module.exports = function (app, models) {
  //index
  app.get('/', (req, res) => {
    models.Location.findAll().then(location => {
      res.render('index', {locations: locations});
    })
  })
  //New
  app.get('/locations/new', (req, res) => {
    res.render('locations-new', {});
  })
  //create
  app.post('/index', (req, res) => {
    models.Location.create(req.body).then(location => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
    });
  })



  //Edit

  //Update

  //Show

  //Delete
}
