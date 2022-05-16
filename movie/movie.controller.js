const movieModel = require("./movie.model");

function listAction(request, response) {
  const sort = request.query.sort ? request.query.sort : "";
  movieModel
    .getAll(sort, "sepp")
    .then((movies) => response.json(movies))
    .catch((error) =>
      response.status(error === "Database error" ? 500 : 400).json(error)
    );
}

function viewAction(request, response) {
  movieModel
    .get(request.params.id, "sepp")
    .then((movie) => response.json(movie))
    .catch((error) =>
      response.status(error === "Database error" ? 500 : 400).json(error)
    );
}

function insertAction(request, response) {
  const movie = {
    id: parseInt(request.body.id, 10),
    title: request.body.title,
    year: parseInt(request.body.year, 10),
    published: request.body.published === "true" ? true : false,
    owner: parseInt(request.body.owner, 10),
  };
  movieModel
    .insert(movie, "sepp")
    .then((movie) => response.json(movie))
    .catch((error) =>
      response.status(error === "Database error" ? 500 : 400).json(error)
    );
}
function updateAction(request, response) {
  const id = parseInt(request.params.id, 10);
  const movie = {
    id: parseInt(request.body.id, 10),
    title: request.body.title,
    year: parseInt(request.body.year, 10),
    published: request.body.published === "true" ? true : false,
    owner: parseInt(request.body.owner, 10),
  };
  movieModel
    .update(id, movie, "sepp")
    .then((movie) => response.json(movie))
    .catch((error) =>
      response.status(error === "Database error" ? 500 : 400).json(error)
    );
}
function removeAction(request, response) {
  movieModel
    .remove(request.params.id, "sepp")
    .then(() => response.json({}))
    .catch((error) =>
      response.status(error === "Database error" ? 500 : 400).json(error)
    );
}
function removeAllAction(request, response) {
  movieModel
    .removeAll("sepp")
    .then(() => response.json({}))
    .catch((error) =>
      response.status(error === "Database error" ? 500 : 400).json(error)
    );
}

module.exports = { listAction, viewAction, insertAction, updateAction, removeAction, removeAllAction };

/*
function viewAction(request, response) {
  movieModel
    .get(request.params.id, "sepp")
    .then((movie) =>
      response.format({
        "application/xml": () => {
          movies = movies.map((movie) => ({ movie }));
          response.send(`<movies>${jsonXml(movies)}</movies>`);
        },
        "application/json": () => response.json(movies),
        default: () => response.json(movies),
      })
    )
    .catch((error) =>
      response.format({
        "application/xml": () =>
          response.status(error === "Database error" ? 500 : 400).send(error),
        "application/json": () =>
          response.status(error === "Database error" ? 500 : 400).json(error),
        default: () =>
          response.status(error === "Database error" ? 500 : 400).json(error),
      })
    );
}
const jsonXml = require("jsontoxml");
function listAction(request, response) {
  const sort = request.query.sort ? request.query.sort : "";
  movieModel
    .getAll(sort, "sepp")
    .then((movies) =>
      response.format({
        "application/xml": () => {
          movies = movies.map((movie) => ({ movie }));
          response.send(`<movies>${jsonXml(movies)}</movies>`);
        },
        "application/json": () => response.json(movies),
        default: () => response.json(movies),
      })
    )
    .catch((error) =>
      response.format({
        "application/xml": () =>
          response.status(error === "Database error" ? 500 : 400).send(error),
        "application/json": () =>
          response.status(error === "Database error" ? 500 : 400).json(error),
        default: () =>
          response.status(error === "Database error" ? 500 : 400).json(error),
      })
    );
}
function insertAction(request, response) {
  const movie = {
    id: parseInt(request.body.id, 10),
    title: request.body.title,
    year: parseInt(request.body.year, 10),
    published: request.body.published === "true" ? true : false,
    owner: parseInt(request.body.owner, 10),
  };
  movieModel
    .insert(movie, "sepp")
    .then((movie) =>
      response.format({
        "application/xml": () => {
          movies = movies.map((movie) => ({ movie }));
          response.send(`<movies>${jsonXml(movies)}</movies>`);
        },
        "application/json": () => response.json(movies),
        default: () => response.json(movies),
      })
    )
    .catch((error) =>
      response.format({
        "application/xml": () =>
          response.status(error === "Database error" ? 500 : 400).send(error),
        "application/json": () =>
          response.status(error === "Database error" ? 500 : 400).json(error),
        default: () =>
          response.status(error === "Database error" ? 500 : 400).json(error),
      })
    );
}
function updateAction(request, response) {
  const id = parseInt(request.params.id, 10);
  const movie = {
    id: parseInt(request.body.id, 10),
    title: request.body.title,
    year: parseInt(request.body.year, 10),
    published: request.body.published === "true" ? true : false,
    owner: parseInt(request.body.owner, 10),
  };
  movieModel
    .update(id, movie, "sepp")
    .then((movie) =>
      response.format({
        "application/xml": () => {
          movies = movies.map((movie) => ({ movie }));
          response.send(`<movies>${jsonXml(movies)}</movies>`);
        },
        "application/json": () => response.json(movies),
        default: () => response.json(movies),
      })
    )
    .catch((error) =>
      response.format({
        "application/xml": () =>
          response.status(error === "Database error" ? 500 : 400).send(error),
        "application/json": () =>
          response.status(error === "Database error" ? 500 : 400).json(error),
        default: () =>
          response.status(error === "Database error" ? 500 : 400).json(error),
      })
    );
}

*/
