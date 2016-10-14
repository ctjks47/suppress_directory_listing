'use strict';

const Hapi = require('hapi');
var Blankie = require('blankie');
var Scooter = require('scooter');
const Inert = require('inert');
const server = new Hapi.Server();
const port = 3000;
server.connection({
  port: port
});

server.register([
  {
    register: require('inert')
  },{
    register: Inert,
    options: {}
  },{
    register: Scooter,
    options: {}
  },{
    register: Blankie,
    options: {scriptSrc: 'self'}
  }
], function (err) {
  if (err) {
    throw err;
  }

  server.route([
    {
      method: 'GET',
      path: '/directory/{path*}',
      handler: {
        directory: {
          path: './',
          listing: true
        }
      }
    },
    {
      method: 'POST',
      path: '/multiple/{path*}',
      handler: {
        directory: {
          path: [
            './',
            '../'
          ],
          listing: true
        }
      }
    }
  ]);
});

server.start(function () {
  console.log('Now Visit: http://localhost:' + port);
});
