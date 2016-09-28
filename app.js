var express = require("express");
var app = express();

app.get("/", function(request, response) {
	        response.send("<h1>Hello, World</h1>");
});

app.listen(1701, function() {
	        console.log("Express Server started on port 1701");
});

