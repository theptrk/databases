var mysql = require('mysql');
var connection = require(__dirname + '/persistent_server.js').dbConnection;

connection.query("SELECT * from rooms", function(err, rows){
  if (err) {
    console.log(err);
  };
  console.log(rows);
});


// insert a row and retrieve the insert id
exports.insertRowInto = function(table, field, value) {
  value = JSON.stringify(value);
  dbConnection.query('INSERT INTO '+table+' SET ?', {field: value}, function(err, result) {
    if (err) throw err;
    return result.insertId;
  });
};

exports.insertObjInto = function(table, dataObj) {
  dbConnection.query('INSERT INTO '+table+' SET ?', dataObj, function(err, result) {
    if (err) throw err;
    return result.insertId;
  });
};

exports.getId = function(table, field, value){
  // Querying requires a stringified verision of the value
  value = JSON.stringify(value);
  var yes = dbConnection.query("SELECT * from "+ table + " where "+ field +" = " + value,
    function(err, rows){
      if (err) {
        console.log('err');
        console.log(err);
      };
      console.log(rows[0]["id"]);
      return rows[0].id;
    });
};


exports.queryOne = function(table, field, value){
  // Querying requires a stringified verision of the value
  value = JSON.stringify(value)
  dbConnection.query("SELECT * from "+ table + " where "+ field +" = " + value,
    function(err, rows){
      if (err) {
        console.log(err);
      }
      console.log('queryOne');
      console.log(rows);
    });
};

exports.queryAll = function(table){
  dbConnection.query("SELECT * from " + table , function(err, rows){
    if (err) {
      console.log(err);
    }
    console.log("queryAll");
    console.log(rows);
    return rows;
  });
};
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */
