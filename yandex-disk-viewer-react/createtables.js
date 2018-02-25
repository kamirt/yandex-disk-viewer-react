var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('yadiskdb');

db.serialize(function() {
  db.run('CREATE TABLE sessions (token TEXT, login TEXT, password TEXT)');
});

db.close();
