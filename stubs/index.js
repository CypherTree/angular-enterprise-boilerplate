'use strict';
// jshint eqeqeq: false
// jshint unused: false
// jshint maxstatements: 50

/**
 * Module dependencies.
 */

var _url = require('url');

var people = ['Anit Rai', 'Madhavi Solanki', 'Rama Paudyal', 'Radhiks S.'];

var texts = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing, Recusandae accusamus reiciendis voluptates. Hic sit repellat, veritatis, quod possimus adipisci voluptates! Earum, quia, impedit',
  'perferendis sed officiis nemo molestiae labore totam, reiciendis voluptates reiciendis voluptates. Hic sit repellat, veritatis, quod possimus adipisci voluptates! Earum, quia, impedit',
  'inventore quos. Quaerat asperiores illo, dolorum totam aspernatur reiciendis voluptates. Hic sit repellat, veritatis, quod possimus adipisci voluptates! Earum, quia, impedit',
  'Hic sit repellat, veritatis, quod possimus adipisci voluptates! Earum, quia, impedit. '
];

var desc = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae accusamus, perferendis sed officiis nemo molestiae labore totam, reiciendis voluptates. Hic sit repellat, veritatis, quod possimus adipisci voluptates! Earum, quia, impedit.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, tempora, porro! Animi dolores nihil facere maiores esse doloribus. Eius dignissimos voluptatem quisquam inventore quos. Quaerat asperiores illo, dolorum totam aspernatur.'
];
var items = [];

// populate items

for (var i = 0; i < 100; i++) {
  items.push({

  });
}

/**
 * Expose
 */

module.exports = function (app) {

  // Send 204 for all delete requests
  app.delete('*', function (req, res) {
    setTimeout(function () {
      res.status(204).end();
    }, 3000);
  });

  app.post('*', function (req, res) {
    setTimeout(function () {
      res.json(items[0]);
    }, 3000);
  });

  app.put('*', function (req, res) {
    setTimeout(function () {
      res.json(req.body);
    }, 3000);
  });

  app.get('/:app/:items/:id', function (req, res) {
    setTimeout(function(){
      res.json(items[req.params.id]);
    }, 3000);
  });
};
