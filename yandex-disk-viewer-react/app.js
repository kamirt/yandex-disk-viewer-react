const http = require("http");
const yd = require('yandex-disk');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

let app = express();

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Content-Type", "application/json")
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
  console.log('Query',  req.query)
  let token = req.query.token
  let db = new sqlite3.Database('./yadiskdb', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('something went wrong');
    }
  });
  db.serialize(() => {
    db.get('SELECT login, password from sessions WHERE token = ?', [token], (err, row) => {
        if (row) {
          app.disk = new yd.YandexDisk(row.login, row.password)
          next();
        } else {
          console.log('eror: no such user');
          next();
        }
      });
  });

  db.close((err) => {
    if (err) {
      console.error('Error db', err.message);
    }
  });

})

function writeNewUser(token, login, password) {
  let db = new sqlite3.Database('./yadiskdb', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('something went wrong');
    }
  });
  db.run(`INSERT INTO sessions(token, login, password) VALUES(?, ?, ?)`, [token, login, password], function(err) {
    if (err) {
      return err.message;
    }
  });
  db.close();
}



const jResp = function (res, data) {
  res.end(JSON.stringify(data))
}

app.options('*', function(req, res){
  res.end(JSON.stringify({ success: true }));
})

app.post('/yadisk-api/login/', function (req, res) {
  let login = req.body.login;
  let pass = req.body.password;
  let hashedLogin = crypto.createHash('md5').update(login).digest("hex");
  if (login && pass) {
    app.disk = new yd.YandexDisk(login, pass);
    app.disk.exists('/', function(err, result){
      if (err) {
        jResp(res, {error: 'Не удалось авторизоваться, проверьте логин и пароль'})
      } else {
        writeNewUser(hashedLogin, login, pass);
        jResp(res, {token: hashedLogin});
      }
    });
  } else {
    jResp(res, { error: 'Отсутствует логин или пароль' })
  }
});

app.get('/yadisk-api/dir/:folder', function(req, res){
  let folder = req.params.folder;
  folder = folder === 'root' ? '/' : folder;
  app.disk.readdir(folder, function(err, result){
    if (err) {
      jResp(res, {error: err})
    } else {
      jResp(res, {items: result})
    }
  });
});

app.listen(5005, function () {
  console.log('Yandex-viewer is running on port 5005');
});
