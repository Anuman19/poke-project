import mysql from "mysql2/promise"

const pool = mysql.createPool({
    host: "localhost",
    user: "nextjsuser",
    password: "nextjspassword",
    database: 'users',
})

export async function getAllUsers() {
    const [rows, fields] = await pool.query("select * from users")
    return rows
}