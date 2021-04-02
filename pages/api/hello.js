// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var mysql = require("mysql");

export default (req, res) => {
  res.statusCode = 200;

  var pool = mysql.createPool({
    host: process.env.SK_PROD_IP,
    user: process.env.SK_USER,
    password: process.env.SK_PASSWORD,
    database: process.env.SK_DB,
    timezone: "+00:00",
  });

  var response = "";
  pool.query(
    "select * from player where name = 'mathsman' and clan_name = 'Reddit'",
    function (error, results, fields) {
      if (error) throw error;
      response = results[0].tag;
      res.json({ name: response });
    }
  );
};
