// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var mysql = require("mysql");

export default async (req, res) => {
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

  var response = "";
  await pool.query(
    "select * from player where name = 'mathsman' and clan_name = 'Reddit'",
    (error, results, fields) => {
      if (error) throw error;
      response = results[0].tag;
      res.statusCode = 200;
      res.json({ name: response });
    }
  );
};
