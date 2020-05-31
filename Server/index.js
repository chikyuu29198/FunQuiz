var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
require('./routes.js')(app);
 
const port = process.env.PORT || 1337;
// Create a Server
var server = app.listen(port);

console.log("Server running at http://localhost:%d", port);

// app.listen(5000, () => {
//     console.log('App listening on port 5000')
//  })