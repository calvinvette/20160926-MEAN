var mysql = require("mysql");
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : "password",
    database : 'weasleydb' // Should match the RunAll.sql script!
});

connection.connect(function err() {
    if (err) {
        console.log("Error while connceting! ")
    } else {
        console.log("Connected.");
    }
});

// findAll
connection.query("select * from customer", function(err, rows) {
    if (err) {
        console.log("Err: " + err);
    } else {
        console.log("Success...");

        for (var i = 0; i< rows.length; i++) {
            console.log(rows[i]);
        }
    }
});

// findByID
connection.query("select * from customer where customerId = ?", [1], function(err, results) {
   if (err) {
       console.log("Err: " + err);
   } else {
       console.log("Success...");
       results.forEach(function(row, idx, array) {
          console.log("Customer #%s: %s %s, Phone: %s",
              row.customerId, row.firstName, row.lastName, row.phoneNumber);
       });
   }
});

// Insert
connection.query("insert into customer " +
    "(firstName, lastName, phoneNumber)" +
    " values(?, ?, ?);", ['Neville', 'Longbottom', '+44 0206 491-2934'],
    function(err, results) {
        if (err) {
            console.log("Err: " + err);
        } else {
            console.log("Success...");
            console.log(results);
        }
});


// Terminate the connection and the thread holding it.
//connection.destroy();
connection.end(function(err) {
   console.log("Closed connection.");
});
