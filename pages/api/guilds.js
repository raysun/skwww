import { getSession } from "next-auth/client";
import jwt from "next-auth/jwt";
const fetch = require('node-fetch');
const postgres = require("postgres")


const secret = process.env.SECRET;
const postgresUri = process.env.POSTGRES_DATABASE_URL;

export default async (req, res) => {
    const session = await getSession({ req });
    const token = await jwt.getToken({ req, secret });
    const sql = postgres(postgresUri);

    if (session) {
        const userId = token.picture.match('/([0-9]{15,20})?/g')
        console.log(userId)
        const [results] = await sql`select * from accounts where provider_account_id = '230214242618441728'`

        console.log(results);

        const auth = `Bearer ${results.access_token}`
        console.log(auth)
        const guilds = fetch('https://discord.com/api/v8/users/@me/guilds', {method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: auth}}).then(res => res.json());
        console.log(guilds);
        res.statusCode = 200;
        res.json({ guilds: guilds });
    } else {
        res.send({
            error: "You must be sign in to view the protected content on this page.",
        });
    }
};
