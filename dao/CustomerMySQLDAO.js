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


var app = {};
function init(appVar) {
    app = appVar;
}

var mysqlDao = function() {};


mysqlDao.prototype.findById = function (customerId) {

    var promise = new Promise(function(resolve, reject) {
        var foundCust = null;
        connection.query("select * from customer where customerId = ?", [customerId], function(err, results) {
            if (err) {
                console.log("Err: " + err);
                reject(err);
            } else {
                console.log("Success...");
                results.forEach(function(row, idx, array) {
                    foundCust = row;
                });
                // fulfill the promise
                resolve(foundCust);
            }
        });
    });
    return promise;
};

mysqlDao.prototype.findByLastName = function (lastName) {
    var foundCusts = [];
    connection.query("select * from customer where lastName = ?", [lastName], function(err, results) {
        if (err) {
            console.log("Err: " + err);
        } else {
            console.log("Success...");
            results.forEach(function(row, idx, array) {
                foundCusts.push(row);
            });
        }
    });
    return foundCusts;
};

mysqlDao.prototype.findAll = function () {
    var customers = [];
    connection.query("select * from customer", function(err, rows) {
        if (err) {
            console.log("Err: " + err);
        } else {
            for (var i = 0; i< rows.length; i++) {
                customers.push(rows[i]);
            }
        }
    });
    return customers;
};

mysqlDao.prototype.insert = function (cust) {
    connection.query("insert into customer " +
        "(firstName, lastName, phoneNumber)" +
        " values(?, ?, ?);", [cust.firstName, cust.lastName, cust.phoneNumber],
        function(err, results) {
            if (err) {
                console.log("Err: " + err);
            } else {
                cust.customerId = results.insertedId;
            }
        });
    return cust;
};

mysqlDao.prototype.update = function (customerToUpdate) {
    var cust = null;
    connection.query("update customer set " +
        "firstName = ?, lastName = ?, phoneNumber = ? where customerId = ?",
        [customerToUpdate.firstName, customerToUpdate.lastName, customerToUpdate.phoneNumber, customerToUpdate.customerId],
        function(err, results) {
            if (err) {
                console.log("Err: " + err);
            }
        });
    return cust;
};

mysqlDao.prototype.remove = function(customer) {
    var id = customer.customerId;
    connection.query("delete from customer where customerId = ?", id,
        function(err, results) {
            if (err) {
                console.log("Err: " + err);
            } else {
                console.log("Success...");
            }
        });
    return customer;
};

mysqlDao.prototype.close = function() {
    connection.end(function(err) {
        console.log("Closed connection.");
    });
};

module.exports = new mysqlDao();