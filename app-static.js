var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");

router.use(function(request, response, next) {
    var now = new Date();
    console.log("%s [%s] %s %s %s %s",
        now.getTime(),
        now.toDateString(),
        request.method,
        request.url,
        request.path,
        request.user
    );
    next();
});

router.use("/", function(request, response, next) {
    response.send("<h1>Hello, Admin</h1>");
    next();
});

app.use("/admin", router);

app.get("/", function(request, response) {
    response.send("<h1>Hello, World (root-level) </h1>");
});

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/api/customers", function(request, response) {
    var options = {
        // path.resolve(__dirname, "/data/")
        root: __dirname + "/data/",
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = "customers.json";
    response.sendFile(fileName, options,
        function (err) {
        if (err) {
            console.log(err);
            response.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });
});

// app.get("*", function(request, response) {
//     response.render("404", {url : request.url});
// });

//var port = (process.env.EXPRESS_PORT) ? process.env.EXPRESS_PORT : 1701;
var port = process.env.EXPRESS_PORT || 1701;
app.listen(port, function() {
    console.log("Express Server started on port " + port);
});

