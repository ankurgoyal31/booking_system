import mysql from "mysql2/promise"
async function connect() {
  const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true 
});
  return db;
} 
  
export default connect;
