//2a
import mysql2 from 'mysql2'
//2b
export const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"BuchokoyMysql.1990",
    database:"blog_finch"
})