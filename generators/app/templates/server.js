'use strict';

var fs = require('fs'); //for image upload file handling

var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
var host = 'localhost';

app.use(express.static('./')); //serve static files

//catch all route to serve index.html (main frontend app)
app.get('*', function(req, res) {
  console.log('Redirect to index.html');
  res.sendfile('./index.html');
});

app.listen(port);

console.log('Server running at http://' + host + ':' + port.toString() + '/');