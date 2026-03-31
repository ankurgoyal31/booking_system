import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
let db;

async function connect() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT, 
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
      },
       multipleStatements: true
    });
    return db;

  } catch (err) {
    console.log("DB Error:", err);
  }
}

export default connect;
