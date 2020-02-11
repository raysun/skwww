const keys = require("./keys.json");
let pool;
let query;

function connect() {
  if (pool == undefined) {
    var mysql = require("mysql");
    const util = require("util");

    pool = mysql.createPool({
      user: keys.user,
      password: keys.password,
      database: keys.schema,
      socketPath: keys.socketPath
    });
    query = util.promisify(pool.query).bind(pool);
  } else {
    console.log("Pool is already inited");
  }
  return query;
}

exports.connect = connect;
