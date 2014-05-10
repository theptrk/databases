/* globals require, __dirname */
var express = require("express");
var fs = require("fs");
var url = require("url");
var path = require("path");
var _  = require("underscore");
var mysql = require('mysql');
var db = require(__dirname + '../../../SQL/persistent_server.js');
// Create the main express app.
var app = express();

var server = app.listen(3000, function() {
  console.log("Listening on port %d", server.address().port);
});

// These headers are extremely important as they allow us to
// run this file locally and get around the same origin policy.
// Without these headers our server will not work.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

// This function is extremely useful. It lets us
// abstract away the logic of writing response headers
// and status-codes for our get and post ajax requests
//
// handleResponse takes a response object, and returns
// a specialized function that will apply some return
// string and statusCode to the response. Effectively,
// this lets us just use _.partial(sendData, res) as our
// callback to many asynchronous functions and make
// the logic of our code much simpler.
//
// Such is the power of closures.
var sendData = function (res, data, statusCode) {
  res.writeHead(statusCode || 200, defaultCorsHeaders);
  res.end(data);
};

// These are two really cool functions. By just creating these
// general getFrom/postTo functions it makes adding messages or rooms
// extremely easy.
//
// Unfortunately, you'll probably have to refactor this to work with
// a more complex database where rooms aren't represented in the same
// way as messages. It's clean for now though.
var getFromCollection = function (collection, callback) {
  callback(JSON.stringify({results: collection}));
};

var postToCollection = function (collection, query, callback) {
  // We take the O(n) hit here, once per message,
  // rather than reversing the list on the client
  // every time we make a GET request.
  collection.unshift(query);
  // Dole out the right response code.
  callback("Messages Received.");
};

var setupCollection = function (app, collectionName, collection) {
  var collectionURL = "/classes/" + collectionName; // Fewer allocated strings.
  app.get(collectionURL, function (req, res) {
    console.log("Serving a get request on: " + collectionURL);
    getFromCollection(collection, _.bind(res.json, res, 201));
  });

  app.post(collectionURL, function (req, res) {

    console.log(req.body)
    console.log("POSTED");
    db.query();

    // console.log("Serving a post request on: " + collectionURL);
    // // Such is the power of currying.
    // // _ = missing middle argument = the data from the post request
    // postToCollection(collection, req.body, _.bind(res.json, res, 201));
  });
};

app.configure(function () {
  // Some catch-all express magic to serve all of our client
  // css and js easily. This is much dirtier in vanilla node.
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../client")));
  app.use(app.router);
});


setupCollection(app, "messages", []);
setupCollection(app, "rooms",    []);

