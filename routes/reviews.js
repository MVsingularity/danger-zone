var express = require('express');
var router = express.Router();
const moment = require("moment")
module.exports = function (app, models) {

  // NEW
  app.get('/locations/:locationId/reviews/new', (req, res) => {
    models.Location.findByPk(req.params.locationId).then(locations => {
      res.render('review-new', {locations});
    });
  });

  // CREATE
  app.post('/locations/:locationId/reviews', (req, res) => {
      req.body.LocationId = req.params.locationId;
      models.Review.create(req.body).then(review => {
        review.setUser(res.locals.currentUser);
        res.redirect(`/locations/${req.params.locationId}`);
      }).catch((err) => {
          console.log(err)
      });
    });

  // show
  // app.get('')
  // DESTROY
  app.delete('/locations/:locationId/review/:id', (req, res) => {
      models.Review.findByPk(req.params.id).then(review => {
          review.destroy();
          res.redirect(`/locations/${req.params.locationId}`);
      }).catch((err) => {
          console.log(err);
      });
  });
  // update

  // Edit
}
