const postgres = require("pg");
var util = require("util");

let query;

exports.connect = () => {
    if (process.env.NODE_ENV !== "production") {
        require("dotenv").config();
    }

    const sql = postgres(process.env.POSTGRESQ_DATABASE_URL);
    query = util.promisify(query).bind(sql);
    return query;
};