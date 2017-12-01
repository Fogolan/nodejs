const express = require('express');
const app = express();
const uid = require('uid');
const helper = require('./Helpers/WriteFile.js');
const validator = require('./Helpers/Validation.js');
let films = require('./top250.json');

app.get('/', (req, res) => {
  res.send("Hello World!!!");
});

app.get('/api/films/readAll', (req, res) => {
  let newFilms = [];

  for (let i = 0; i < films.length; i++) {
    newFilms.push(Object.assign({}, films[i]));
  }

  newFilms.sort((a, b) => {

    if (a.position > b.position) return 1;
    if (a.position === b.position) return 0;
    if (a.position < b.position) return -1;
  });

  res.send(newFilms);
});

app.get('/api/films/read', (req, res) => {
  let filmId = req.query.id;
  for (let i = 0; i < films.length; i++) {
    if (films[i].id == filmId)
      res.send(films[i]);
}
res.send("not found");
});

app.post('/api/films/create', (req, res) => {
  parseBodyJson(req, (err, payload) => {
  let film = {
    id: uid(),
    title: payload.title,
    rating: payload.rating,
    year: +payload.year,
    budget: +payload.budget,
    gross: +payload.gross,
    poster: payload.poster,
    position: +payload.position
  }
  if (validator.validateFilm(film)) {
    validator.checkPosition(films,film);
    validator.deleteSpaces(films,film);
    films.push(film);
    helper.writeFile(films);
    res.send(films);
  }
  else
  res.send("ivalid data");
})
})

app.post('/api/films/update', (req, res) => {
  parseBodyJson(req, (err, payload) => {
  let newFilm = payload;
  let updateFilm;
  for (let i = 0; i < films.length; i++) {

    if (films[i].id == newFilm.id){
      updateFilm = validator.validateUpdateFilm(newFilm,films[i],films);
      if(validator.validateFilm(updateFilm)){
        validator.checkPosition(films,updateFilm);
        validator.deleteSpaces(films,updateFilm);
        Object.assign(films[i], updateFilm);
      }
    }
  }
  helper.writeFile(films);
  res.send(films);
});
})

app.delete('/api/films/delete', (req, res) => {
  parseBodyJson(req, (err, payload) => {
  let deletedFilm = payload;
  for (let i = 0; i < films.length; i++) {
    if (films[i].id == deletedFilm.id){
      validator.validateDeleteFilm(films,films[i]);
      films.splice(films.findIndex(x => x.id === payload.id), 1);
    }
     
  }
  helper.writeFile(films);
  res.send(films);
})
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})

function parseBodyJson(req, cb) {
  let body = [];

  req.on('data', function (chunk) {
      body.push(chunk);
  }).on('end', function () {
      body = Buffer.concat(body).toString();

      if (body === "") {
          cb(null, null);

      }
      else {
          let params = JSON.parse(body);
          cb(null, params);
      }
  });
}

