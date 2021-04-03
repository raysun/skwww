// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("./db");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export default async (req, res) => {
  const query = db.connect();

  const results = await query(
    "select * from player where name = 'mathsman' and clan_name = 'Reddit'"
  );
  res.statusCode = 200;
  res.json({ tag: results[0].tag });
};
