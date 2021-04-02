// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("./db");

export default async (req, res) => {
  const query = db.connect();

  const tag = req.query.tag;
  const results = await query(
    `select * from player_all where clan_tag = '#${tag}'`
  );
  res.statusCode = 200;
  res.json({ members: results });
};
