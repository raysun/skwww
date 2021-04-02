var mysql = require("mysql");
var util = require("util");

let query;

exports.connect = () => {
  if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

  var pool = mysql.createPool({
    host: process.env.SK_PROD_IP,
    user: process.env.SK_USER,
    password: process.env.SK_PASSWORD,
    database: process.env.SK_DB,
    timezone: "+00:00",
  });
  query = util.promisify(pool.query).bind(pool);
  return query;
};
