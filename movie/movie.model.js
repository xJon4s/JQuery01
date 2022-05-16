const mysql = require("mysql");
const connectionProperties = {
  host: "localhost",
  user: "root",
  password: "masterkey",
  database: "movie-db",
};
class Database {
  constructor(connectionProperties) {
    this.connection = mysql.createConnection(connectionProperties);
  }
  query(sql, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
  queryClose(sql, params) {
    const ret = this.query(sql, params);
    this.close();
    return ret;
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }
}
async function getAll(sort = null, username = null) {
  const sql = `
    SELECT m.id, title,year,published,CONCAT(firstname, " ", secondname) as fullname, owner
    FROM movies m, users u
    WHERE m.owner = u.id
    ${
      username
        ? "AND (u.username = ? OR published = true)"
        : "AND published = true"
    }
    ORDER BY title ${!sort || sort === "asc" ? "ASC" : "DESC"};
    `;
  const database = new Database(connectionProperties);
  try {
    const result = await database.queryClose(sql, [username]);
    return result.length === 0
      ? Promise.reject("No movies found")
      : Promise.resolve(result);
  } catch (error) {
    return Promise.reject("Database error");
  }
}
async function get(id, username) {
  if (!username) {
    return Promise.reject("User not set");
  } else {
    try {
      const database = new Database(connectionProperties);
      const sql = ` SELECT m.id, title,year,published,CONCAT(firstname, " ", secondname) as fullname, owner
      FROM movies m, users u
      WHERE m.owner = u.id 
      AND m.id = ?
      AND (u.username = ? OR published = true)`;
      const result = await database.queryClose(sql, [id, username]);
      if (result.length === 0) {
        return Promise.reject("Movie not found");
      } else {
        return Promise.resolve(result[0]);
      }
    } catch (error) {
      return Promise.reject("Database error");
    }
  }
}
async function insert(movie, username) {
  if (!username) {
    return Promise.reject("User not set");
  } else {
    try {
      const database = new Database(connectionProperties);
      const sql = `SELECT * FROM movies WHERE title = ?`;
      const result = await database.queryClose(sql, [movie.title]);
      if (result[0] === undefined) {
        const database = new Database(connectionProperties);
        const sql = `INSERT INTO movies(title, year, published, owner) VALUES (?,?,?,?)`;
        const result = await database.queryClose(sql, [
          movie.title,
          movie.year,
          movie.published,
          movie.owner,
        ]);
        if (!result.insertId) {
          return Promise.reject("User not found");
        } else {
          return Promise.resolve(await get(result.insertId, username));
        }
      } else {
        return Promise.reject("Title exists");
      }
    } catch (error) {
      return Promise.reject("Database error");
    }
  }
}
async function update(id, movie, username) {
  if (!username) {
    return Promise.reject("User not set");
  } else {
    try {
      const database = new Database(connectionProperties);
      const sql = `SELECT * FROM movies WHERE title = ?`;
      const result = await database.queryClose(sql, [movie.title]);
      if (result[0] === undefined) {
        const database = new Database(connectionProperties);
        const sql = `UPDATE movies id = ?, title = ?, year = ?, published = ?, owner = ? WHERE id = ?`;
        const result = await database.queryClose(sql, [
          movie.id,
          movie.title,
          movie.year,
          movie.published,
          movie.owner,
          id,
        ]);
        if (!result.insertId) {
          return Promise.reject("User not found");
        } else {
          return Promise.resolve(await get(result.insertId, username));
        }
      } else {
        return Promise.reject("Title exists");
      }
    } catch (error) {
      return Promise.reject("Database error");
    }
  }
}

async function remove(id, username) {
  if (!username) {
    return Promise.reject("User not set");
  } else {
    try {
      const database = new Database(connectionProperties);
      const sql = `Delete FROM movies WHERE id = ? `;
      const result = await database.queryClose(sql, [id]);
      if(result.affectedRows == 0){
        return Promise.reject("Movie not found");
      }else{
        return Promise.resolve([])
      }
    } catch (error) {
      return Promise.reject("Database error");
    }
  }
}

async function removeAll(username) {
  if (!username) {
    return Promise.reject("User not set");
  } else {
    try {
      const database = new Database(connectionProperties);
      const sql = `Delete FROM movies`;
      const result = await database.queryClose(sql);
      if(result.affectedRows == 0){
        return Promise.reject("Movies not found");
      }else{
        return Promise.resolve([])
      }
    } catch (error) {
      return Promise.reject("Database error");
    }
  }
}

module.exports = { get, getAll, insert, update, remove, removeAll };
