import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mysql from 'mysql2';

dotenv.config();
const port = 3000;
const name = 'movIA';
const version = '1.0.0';

const dbConfig = {
    host: '',
    user: '',
    password: '',
    database: '',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MariaDB:', err);
        return;
    }
    console.log('Connected to MariaDB');
});

const server = express();
server.use(cors());
server.use(express.json());

server.get('/', (_req: Request, res: Response) => { res.send(`Api: ${name} \n version: ${version}`)

    /*const query = 'SELECT * FROM Movies';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });*/
});

process.on('SIGINT', () => {
    connection.end();
    process.exit();
});

server.listen(port, () =>{
    console.log(`${name} on http://localhost:${port}/ `);
});
