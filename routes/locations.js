var express = require('express');
var router = express.Router();
const moment = require("moment")
module.exports = function (app, models) {
  //index
  app.get('/', (req, res) => {
    models.Location.findAll().then(locations => {
      res.render('index', {locations});
    })
  });
  //New
  app.get('/locations/new', (req, res) => {
    res.render('locations-new', {});
  });
  //create
  app.post('/locations', (req, res) => {
    console.log(req.body)
    models.Location.create(req.body).then(locations => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err);
    });
  });



  //Edit
  app.get('/locations/:id/edit', (req, res) => {
      models.Location.findByPk(req.params.id).then((locations) => {
       res.render('locations-edit', {
         locations: locations,
         isEquals: locations.UserId = currentUser.id//won't check to see if they match
       });
      }).catch((err) => {
       console.log(err.message);
     })
   });

  //Update
   app.put('/locations/:id', (req, res) => {
       models.Location.findByPk(req.params.id).then(locations => {
        location.update(req.body).then(locations => {
          res.redirect(`/locations/${req.params.id}`);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
       console.log(err);
      });
  });

  //Show
  app.get('/locations/:id', (req, res) => {
      models.Location.findByPk(req.params.id, { include: [{ model: models.Review }] }
      ).then((location) => {
         //let createdAt = location.createdAt;
        //  createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        //  location.createdAtFormatted = createdAt;
          res.render('locations-show', {location});
      }).catch((err) => {
          console.log(err.message);
      })
  });

  //Delete
  app.delete('/locations/:id', (req, res) => {
      models.Location.findByPk(req.params.id).then(locations => {
        location.destroy();
        res.redirect(`/`);
      }).catch((err) => {
        console.log(err);
      });
    });
}
