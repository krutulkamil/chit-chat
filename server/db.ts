import * as pg from 'pg'
const { Pool } = pg;
import 'dotenv/config';

const pool = new Pool({
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT) | 5432
});

export default pool;