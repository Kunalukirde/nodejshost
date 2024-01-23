const mysql = require('mysql2');

// create a connection pool
const mysqlDB = mysql.createPool({
    host :'localhost',
    user : 'root',
    password :'',
    database : 'nodeauth',
    waitForConnections : true
});

mysqlDB.getConnection((error, result) =>{ 
    if (error) {
        console.log('MySQL Connection pool error' , error);
    } else {
        console.log('MySQL Connected..');
        
    }
})


// // Event listener for when a connetion is established
// mysqlDB.on('connection' , (connection) => {console.log('MySQL Connected')});
// // event listener for when a connection encounters an error
// mysqlDB.on('error',(error)=> { console.log('MySQL connectiol pool error', error)})

module.exports = mysqlDB.promise();