import { getSession } from "next-auth/client";
import jwt from "next-auth/jwt";
const fetch = require('node-fetch');
const postgres = require("postgres")
const db = require("./db");


const clientId = process.env.DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;
const secret = process.env.SECRET;
const postgresUri = process.env.POSTGRES_DATABASE_URL;

export default async (req, res) => {
    const session = await getSession({ req });
    const token = await jwt.getToken({ req, secret });

    if (session) {
        const guildId = req.query.guildId;
        console.log(guildId, req.query)
        if (!guildId) {
            const sql = postgres(postgresUri);

            const userId = token.picture.match(/([0-9]{15,20})/)[0]
            const [results] = await sql`select * from accounts where provider_account_id = ${userId}`


            const auth = `Bearer ${results.access_token}`
            const response = await fetch('https://discord.com/api/v8/users/@me/guilds', {
                method: 'GET',
                headers: {'Content-Type': 'application/json', Authorization: auth}
            });
            var guilds = []
            if (response.status === 401) {
                const refresh = results.refresh_token
                const data = new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: 'refresh_token',
                    refresh_token: refresh,
                })
                const response2 = await fetch('https://discord.com/api/oauth2/token', {
                    method: 'POST',
                    body: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
                const new_access_token = await response2.json()
                console.log(new_access_token)
                const response = await fetch('https://discord.com/api/v8/users/@me/guilds', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${new_access_token.access_token}`
                    }
                });
                await sql`update accounts set access_token = ${new_access_token} where provider_account_id = '230214242618441728'`;
                guilds = await response.json();

            } else {
                guilds = await response.json();
            }
            const only_manage_server = guilds.filter(arr => (arr.permissions & 0x20) === 0x20);

            res.statusCode = 200;
            res.json({guilds: only_manage_server});
        }
        else if (guildId !== 'undefined') {
            const query = db.connect();
            console.log(guildId, 'about to fetch')

            const results = await query(
                `select * from channel where guild_id = '${guildId}'`
            );
            res.statusCode = 200;
            console.log(results)
            res.json({channels: results})
        }

    } else {
        res.send({
            error: "You must be sign in to view the protected content on this page.",
        });
    }
};
