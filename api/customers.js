var express = require("express");
var router = express.Router();
var o2x = require("object-to-xml");
var fs = require("fs");

var app = {};
function init(appVar) {
    app = appVar;
}

function findById(customerId) {
    var foundCust = null;
    customers.forEach(function(cust, idx, array) {
        if (cust.customerId == customerId) {
            foundCust = cust;
        }
    });
    return foundCust;
}


var customers = [];
try {
    customers = JSON.parse(fs.readFileSync("/projects/hello_express/data/customers.json"));
    console.log("Loaded data from /projects/hello_express/data/customers.json");
} catch (e) {
    console.error("Failed to open and parse /projects/hello_express/data/customers.json!\n" + e);
}
    // GET http://localhost:1701/api/customers/1234, where 1234 is the value of "id"
    router.get("/:id", function (request, response) {
        var id = request.params.id;
        console.log("ID: " + id);
        var foundCust = findById(id);
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
        var foundCusts = [];
        var lastName = request.params.lastName;
        customers.forEach(function(cust, idx, array) {
            if (cust.lastName == lastName) {
                foundCusts.push(cust);
            }
        });
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
        response.status(200).json(customers);
        // var options = {
        //     // path.resolve(__dirname, "/data/")
        //     // root: __dirname + "/data/",
        //     root: "/projects/hello_express/data/",
        //     dotfiles: 'deny',
        //     headers: {
        //         'x-timestamp': Date.now(),
        //         'x-sent': true
        //     }
        // };
        // var fileName = "customers.json";
        // response.sendFile(fileName, options,
        //     function (err) {
        //         if (err) {
        //             console.log(err);
        //             response.status(err.status).end();
        //         }
        //         else {
        //             console.log('Sent:', fileName);
        //         }
        //     });
    });

    router.post("/", function(request, response) {
        console.log("Posting customers...");
        var cust = request.body; // Populated by body-parser as JSON
        cust.customerId = new Date().getTime();
        customers.push(cust);
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
        var cust = findById(request.params.id);
        var updatedCustomer = request.body;
        // Checkout underscore/lodash merge functions
        cust.firstName = updatedCustomer.firstName;
        cust.lastName = updatedCustomer.lastName;
        cust.phoneNumber = updatedCustomer.phoneNumber;
        cust.email = updatedCustomer.email;
        response.status(201).json(cust).end();
    });

    // DELETE http://localhost:1701/api/customers/1234
    router.delete("/:id", function(request, response) {
        var id = request.params.id;
        customers.forEach(function(cust, idx, array) {
            if (cust.customerId == id) {
                delete customers[idx];
                response.status(200).json(cust);
            }
        })
        response.end();
    });

    module.exports = router;