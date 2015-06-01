var express = require("express"),
	bodyParser = require("body-parser")
	ejs = require("ejs"),mustacheExpress = require('mustache-express');
	
var app = express();
//app.use(bodyParser);
app.engine('html', ejs.__express);
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes")(app);
console.log("Server is running");
try{
	app.listen(3131);
}
catch(err) {
   console.log (err.message);
   console.log ("Unable to start server " +err);
}