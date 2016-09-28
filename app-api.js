var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");


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

app.use(bodyParser.json());
app.use("/api/customers", require("./api/customers.js"));
// app.use("/api/customers", require("./api/customers.js").default(app));

// app.get("*", function(request, response) {
//     response.render("404", {url : request.url});
// });

//var port = (process.env.EXPRESS_PORT) ? process.env.EXPRESS_PORT : 1701;
var port = process.env.EXPRESS_PORT || 1701;
app.listen(port, function() {
    console.log("Express Server started on port " + port);
});

