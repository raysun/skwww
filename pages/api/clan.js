// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var mysql = require("mysql");
var util = require("util");

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
  const query = util.promisify(pool.query).bind(pool);

  const tag = req.query.tag;
  const results = await query(
    `select * from player_all where clan_tag = '#${tag}'`
  );
  // response = results[0].tag;
  res.statusCode = 200;
  res.json({ members: results });
  // res.json({ name: response });
};
