var express = require('express');
var router = express.Router();
module.exports = function (app, models) {
  //index
  app.get('/', (req, res) => {
    res.render('index', {locations: locations});
  })
  //New
  app.get('/locations/new', (req, res) => {
    res.render('locations-new', {});
  })
  //create
  app.post('/locations', (req, res) => {
    models.location.create(req.body).then(location => {
      location.setUser(res.locals.currentUser);
      res.redirect(`/locations/${event.id}`);
    }).catch((err) => {
      console.log(err)
    });

  })
  //Edit

  //Update

  //Show

  //Delete
}
