app.get("/api/customers", function (request, response) {
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = "Weasleys.txt";
    response.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
            response.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });
})