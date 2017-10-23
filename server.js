// ==============================================================================
// EXPRESS CONFIGURATION
// npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;
// ================================================================================
// BodyParser makes it possible for our server to interpret data sent to it.
// The code below is pretty standard.
// ================================================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use('/static', express.static(path.join(__dirname, 'app/public')))
// ================================================================================
// ROUTER
// ================================================================================

require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

// ==============================================================================
// LISTENER on PORT 8080.
// The below code effectively "starts" the server
// ==============================================================================
//  
app.listen(PORT, function() {
  console.log('---------------------------------------------------------');	
  console.log(' Friend Finder application is listening on PORT: ' + PORT);
  console.log(' Go to you preferred browser and enter: localhost:8080');
  console.log(' to access the Friend Finder application');
  console.log('---------------------------------------------------------');
});