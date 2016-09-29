var mysql = require("mysql");
var connection = mysql.createConnection({
    // Externalize these values, probably in a 'require'-d file
    // that can be changed by environment
    host : 'localhost',
    user : 'root', // use the application's user id, not root!
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


// Update
connection.query("update customer set " +
    "firstName = ?, lastName = ?, phoneNumber = ? where customerId = ?",
    ['Neville', 'Longbottom', '+44 0206 491-2934', 4],
    function(err, results) {
        if (err) {
            console.log("Err: " + err);
        } else {
            console.log("Success...");
            console.log(results);
        }
    });

// Delete
connection.query("delete from customer where customerId = ?", [27],
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
