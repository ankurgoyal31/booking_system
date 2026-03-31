import mysql from "mysql2/promise"
async function connect() {
  const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ankur@631",
  database: "events",
  multipleStatements: true 
});
  return db;
} 
  
export default connect;