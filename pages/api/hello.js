// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var mysql = require("mysql");

export default (req, res) => {
  res.statusCode = 200;

  pool = mysql.createPool({
    host: process.env.SK_PROD_IP,
    user: process.env.SK_USER,
    password: process.env.SK_PASSWORD,
    database: process.env.SK_DB,
    timezone: "+00:00",
  });

  response = "";
  pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
    if (error) throw error;
    response = results[0].solution;
  });

  res.json({ name: response });
};
