var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");


//
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
app.get("/api/customers", function(request, response) {
    response.sendFile(path.resolve(__dirname, "customers.json"));
});

//var port = (process.env.EXPRESS_PORT) ? process.env.EXPRESS_PORT : 1701;
var port = process.env.EXPRESS_PORT || 1701;
app.listen(port, function() {
    console.log("Express Server started on port " + port);
});

