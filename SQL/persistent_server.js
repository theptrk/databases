var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
//var serve = require('../chatterbox-server-1/server/server.js');
//
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();

exports.dbConnection = dbConnection;

// dbConnection.query("SELECT * from messages", function(err, rows, fields){
//   if (err) {
//     console.log(err);
//   };
//   console.log('all messages');
//   console.log(rows);
// });
