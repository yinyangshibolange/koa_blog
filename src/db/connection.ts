let connection: any;
if(!connection) {
    connection = require("mysql").createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "123456",
        database: "blog",
    })
    connection.connect((err: Error) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
}
export default connection;