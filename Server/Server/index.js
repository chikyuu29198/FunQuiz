var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
require('./routes.js')(app);
 
// Create a Server
var server = app.listen(5000, function () {
 
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
 
})
// app.listen(5000, () => {
//     console.log('App listening on port 5000')
//  })