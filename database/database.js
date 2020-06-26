const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'semangat'
});

mysqlConnection.connect(function (error){

        if(error){
            console.log(error);
            return;

        }
        else{
            console.log('Connected');
        }
});

module.exports = mysqlConnection;