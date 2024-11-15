import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'expense2',
    password: 'p@ssw0rd',
    port: 5433,
  });

export default pool;  