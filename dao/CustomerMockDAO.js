var express = require("express");
var router = express.Router();
var o2x = require("object-to-xml");
var fs = require("fs");

var app = {};
function init(appVar) {
    app = appVar;
}

var mock = function() {};

// TODO - modify this as mock.customers throughout the code.
var customers = [];
try {
    customers = JSON.parse(fs.readFileSync("/projects/hello_express/data/customers.json"));
    console.log("Loaded data from /projects/hello_express/data/customers.json");
} catch (e) {
    console.error("Failed to open and parse /projects/hello_express/data/customers.json!\n" + e);
}

mock.prototype.findById = function (customerId) {
    var foundCust = null;
    customers.forEach(function (cust, idx, array) {
        if (cust.customerId == customerId) {
            foundCust = cust;
        }
    });
    return foundCust;
};

mock.prototype.findByLastName = function (lastName) {
    var foundCusts = [];
    customers.forEach(function (cust, idx, array) {
        if (cust.lastName == lastName) {
            foundCusts.push(cust);
        }
    });
    return foundCusts;
};

mock.prototype.findAll = function () {
    return customers;
};

mock.prototype.insert = function (cust) {
    cust.customerId = new Date().getTime();
    customers.push(cust);
    return cust;
};

mock.prototype.update = function (customerToUpdate) {
    var cust = this.findById(customerToUpdate.customerId);
    // Checkout underscore/lodash merge functions
    cust.firstName = customerToUpdate.firstName;
    cust.lastName = customerToUpdate.lastName;
    cust.phoneNumber = customerToUpdate.phoneNumber;
    cust.email = customerToUpdate.email;
    return cust;
};

mock.prototype.remove = function(customer) {
    var id = customer.customerId;
    customers.forEach(function (cust, idx, array) {
        if (cust.customerId == id) {
            delete customers[idx];
            return cust;
        }
    });
    return null;
};

module.exports = new mock();