import fs from "fs";
import connect from "./connection.js";
const sql = fs.readFileSync("./server_handler/init.sql", "utf-8");
const db =await connect()
async function run_sql() {
    await db.query(sql);
    console.log("connected by sql....")
}
run_sql()
