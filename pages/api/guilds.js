import { getSession } from "next-auth/client";
import jwt from "next-auth/jwt";
const fetch = require('node-fetch');
const postgres = require("postgres")


const clientId = process.env.DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;
const secret = process.env.SECRET;
const postgresUri = process.env.POSTGRES_DATABASE_URL;

export default async (req, res) => {
    const session = await getSession({ req });
    const token = await jwt.getToken({ req, secret });
    const sql = postgres(postgresUri);

    if (session) {
        console.log(token)
        const userId = token.picture.match(/([0-9]{15,20})/)[0]
        console.log(userId)
        const [results] = await sql`select * from accounts where provider_account_id = ${userId}`

        console.log(results);

        const auth = `Bearer ${results.access_token}`
        console.log(auth)
        const response = await fetch('https://discord.com/api/v8/users/@me/guilds', {method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: auth}});
        if (response.status === 401) {
            console.log('refreshing')
            const refresh = results.refresh_token
            console.log(refresh)
            const data = new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refresh,
            })
            const response2 = await fetch('https://discord.com/api/oauth2/token', {method: 'POST',  body: data, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
            const new_access_token = await response2.json()
            console.log(new_access_token)
            const response = await fetch('https://discord.com/api/v8/users/@me/guilds', {method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${new_access_token.access_token}`}});
            await sql`update accounts set access_token = ${new_access_token} where provider_account_id = '230214242618441728'`;
            const guilds = await response.json();
            const only_manage_server = guilds.filter(arr => (arr.permissions & 0x20) === 0x20);

            res.statusCode = 200;
            res.json({ guilds: only_manage_server });
        }
        else {
            const guilds = await response.json();
            res.statusCode = 200;
            const only_manage_server = guilds.filter(arr => (arr.permissions & 0x20) === 0x20);
            res.json({ guilds: only_manage_server });
        }

    } else {
        res.send({
            error: "You must be sign in to view the protected content on this page.",
        });
    }
};
