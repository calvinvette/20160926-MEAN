var express = require("express");
var router = express.Router();
var o2x = require("object-to-xml");
var fs = require("fs");
var dao = require('../dao/CustomerMock');

var app = {};
function init(appVar) {
    app = appVar;
}

// DAO interface:
//{
    // insert(Customer) : function {},          // return Customer - slightly modified variant of the original Customer, # rows affected, or primary key of customer just inserted
    // findAll() : function() {},               // return Customer[]
    // findById : function(customerId) {},     // return Customer
    // findByLastName :function(lastName) {},  // return Customer[ ]
    // update : function(Customer) {},          // Customer
    // remove : function(Customer) {}          // Customer // or primary key or # rows affected
//};


    // GET http://localhost:1701/api/customers/1234, where 1234 is the value of "id"
    router.get("/:id", function (request, response) {
        var id = request.params.id;
        var foundCust = dao.findById(id);
        if (foundCust != null) {
            response.status(200).json(foundCust);
        } else {
            response.status(404).json({
                message: "Customer#" + id + " not found."
            }).end();
        }
    });

    // GET http://localhost:1701/api/customers/lastName/Weasley, where Weasley is the value of "lastName"
    router.get("/lastName/:lastName", function (request, response) {
        var lastName = request.params.lastName;
        var foundCusts = dao.findByLastName(lastName);
        if (foundCusts.length > 0) {
            response.status(200).json(foundCusts);
        } else {
            response.status(404).json({
                message: "No Customers with lastName of '" + lastName + "' were found."
            }).end();
        }
    });

    // GET http://localhost:1701/api/customers/
    router.get("/", function (request, response) {
        response.status(200).json(dao.findAll());
    });

    router.post("/", function(request, response) {
        console.log("Posting customers...");
        var cust = request.body; // Populated by body-parser as JSON
        cust = dao.insert(cust);
        // Location Header???
        // 201 - Created with Entity & Location (and maybe ETag)
        // 204 - Created with No Content returned
        response.setHeader("Location", "http://localhost:1701/api/customers/" + cust.customerId);
        var prefers = request.accepts(['xml', 'json']);
        console.log("prefers: " + prefers);
        if (prefers === 'xml') {
            response.setHeader("Content-Type", "application/xml"); // Right MIME type?
            response.status(201).send(o2x({ customer : cust})).end();
        } else if (prefers == 'json') {
            response.status(201).json(cust);
        } else {
            response.status(415); // Unsupported Media Type
        }


    });

    // PUT http://localhost:1701/api/customers/1234
    router.put("/:id", function(request, response) {
        var cust = request.body;
        cust.id = request.params.id;
        var updatedCustomer = dao.update(cust);
        response.status(201).json(updatedCustomer).end();
    });

    // DELETE http://localhost:1701/api/customers/1234
    router.delete("/:id", function(request, response) {
        var id = request.params.id;
        var cust = dao.remove(dao.findById(id));
        response.status(200).json(cust);
        response.end();
    });

    module.exports = router;