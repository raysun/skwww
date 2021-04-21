import { getSession } from "next-auth/client";
const db = require("./db");
import jwt from "next-auth/jwt";

const secret = process.env.SECRET;

export default async (req, res) => {
  const session = await getSession({ req });
  const token = await jwt.getToken({ req, secret });

  if (session) {
    const query = db.connect();

    const tag = req.query.tag;
    const results = await query(
      `select * from player_all where clan_tag = '#${tag}'`
    );
    res.statusCode = 200;
    res.json({ players: results });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};
