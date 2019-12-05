import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// const pool = new Pool({
//     user: 'dbuser',
//     host: 'database.server.com',
//     database: 'mydb',
//     password: 'secretpassword',
//     port: 3211
// });
// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res);
//     pool.end();
// });

const client = new Client({
    // user: process.env.PGUSER,
    host: 'localhost',
    database: 'OnlyLinux_DB',
    // password: process.env.PGPASSWORD,
    port: 8192
});

client.connect();

// client.query('SELECT * FROM hotel', (err, res) => {
//     console.log(res.rows);
// });

export default client;
