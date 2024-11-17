import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

if (!user) {
  throw new Error(
    "DB_USER is not defined in the environment variables"
  );
}

if (!host) {
  throw new Error(
    "DB_HOST is not defined in the environment variables"
  );
}

if (!database) {
  throw new Error(
    "DB_DATABASE is not defined in the environment variables"
  );
}
if (!password) {
  throw new Error(
    "DB_PASSWORD is not defined in the environment variables"
  );
}

if (!port) {
  throw new Error(
    "DB_PORT is not defined in the environment variables"
  );
}
const portNumber = parseInt(port, 10);

if (isNaN(portNumber)) {
  throw new Error("DB_PORT must be a valid number");
}

const { Pool } = pg;

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: portNumber,
});

export default pool;
