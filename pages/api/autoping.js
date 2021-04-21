import { getSession } from "next-auth/client";
const db = require("./db");
import jwt from "next-auth/jwt";

const secret = process.env.SECRET;

export default async (req, res) => {
    const session = await getSession({ req });
    console.log(req, secret)
    const token = await jwt.getToken({ req, secret });
    console.log(token, "is the token")

    if (session) {
        if (req.method === "GET") {
            const query = db.connect();

            // const tag = req.query.tag;
            const results = await query(
                `SELECT * FROM auto_ping
      join player_all using (clan_tag)
      where discord_id = ${token.sub}`
            );
            res.statusCode = 200;
            res.json({ pings: results });

        }
        else if (req.method === "POST") {
            const query = db.connect();

            // const tag = req.query.tag;
            const results = await query(
                `insert into auto_ping (clan_tag, channel_id, )  * FROM auto_ping
      join player_all using (clan_tag)
      where discord_id = ${token.sub}`
            );
            res.statusCode = 200;
            res.json({ pings: results });

        }
    } else {
        res.send({
            error: "You must be sign in to view the protected content on this page.",
        });
    }
};
