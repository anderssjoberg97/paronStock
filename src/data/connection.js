import mysql from "mysql";

/**
 * Connects to the MySQL database
 * @return The connection object
 */
export default function getDatabaseConnection(){
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.MYSQL_PASS,
        database: "paronStock"
    });

    connection.connect(function(err){
        if(err){
            console.error("Error connecting to MySQL " + err.stack);
            return;
        }

        console.log("Connected as ID " + connection.threadId);
    });

    return connection;
}
