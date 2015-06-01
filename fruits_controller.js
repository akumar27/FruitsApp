var MongoClient = require("mongodb").MongoClient;
var fs = require("fs"),
express = require("express"),
http    = require('http');
var fruits = null;
var validator = require('validator');

var app = express();

MongoClient.connect("mongodb://localhost/" , function (err, db){
	fruits = db.db("FruitWorld").collection("Fruit");
});


exports.deleteFruitFromDB = function(req, res){
	console.log("Inside deleteFruitFromDB");
	if(fruits){
		res.writeHead(200, {"Content-Type"  : "text/html"});
		//res.end("Hi, " + req.body.name);
		//fruits.remove({"name": "ObjectId("+req.params.id + ")"});
		
		fruits.remove({_id: req.body.fruitname}, {safe: true}, function(err, result) {
            if (err) {
                console.log("Error");
                //throw err;
            }
            console.log("Success");
        });
		res.end("Fruit " + req.body.fruitname +" is deleted from the Database. <a href='http://localhost:8080/pages/home'>Go back to home page</a>");
		
	}else{
		res.writeHead(503, { "Content-Type" : "text/html" });
		res.end("Unable to find the required file");
	}
}

exports.addNewFruitInDB = function(req, res){
	console.log("Inside NewFruit");
	if(fruits){
		res.writeHead(200, {"Content-Type"  : "text/html"});
		//res.end("Hi, " + req.body.name);
		console.log("Email id: " + req.body.email);
		

		var emailValidationStatus = validator.isEmail(req.body.email); 
		console.log("Email Validation: "+emailValidationStatus);
		
		if(req.body.name == "" && req.body.price == "" && req.body.color == "" && !emailValidationStatus){
			res.end("Please provide all valid information for fruit. <a href='http://localhost:8080/pages/addNewFruit'>Go back to Add New Fruit page</a>");
		}
		else{
			fruits.insert(req.body);
			res.end("New Fruit " + req.body.name +"is stored in Database. <a href='http://localhost:8080/pages/home'>Go back to home page</a>");
		}
		
	}else{
		res.writeHead(503, { "Content-Type" : "text/html" });
		res.end("Unable to find the required file");
	}
}

exports.editFruitInDB = function(req, res){
	console.log("Inside edit Fruit");
	if(fruits){
		res.writeHead(200, {"Content-Type"  : "text/html"});
		//res.end("Hi, " + req.body._id);
		fruits.update({"name" : req.body.name} , {"name" : req.body.editedName, "price" : req.body.price, "color" : req.body.color} , {upsert : false});
		res.end(req.body.name +" is updated in Database. <a href='http://localhost:8080/pages/home'>Go back to home page</a>");
		
	}else{
		res.writeHead(503, { "Content-Type" : "text/html" });
		res.end("Unable to find the required file");
	}
}

exports.getAllFruits = function(req, res){
	if(fruits){
		fruits.find({}, {limit : 10} , function(err, cursor){
			cursor.toArray(function (err,results){
				//res.writeHead(200,{ "Content-Type" : "text/html" });
				res.json(results);
				//res.writeHead(400,{ "Content-Type" : "text/html" });
				//res.end('No stub information available on server');
			});
		});
	}else{
		res.json(503 , {});
	}
}

exports.home = function(req, res){
	fs.readFile("home.html" , "utf8", function (err , contents){
		if(err){
			res.writeHead(503, { "Content-Type" : "text/html" });
			res.end("Unable to find the required file");
			return ;			
		}
		
		res.writeHead(200, {"Content-Type"  : "text/html"});
		res.end(contents);
	});	
}

exports.showNewFruitPage = function(req, res){
console.log("Inside showNewFruitPage...");
	fs.readFile("./static/newFruit.html" , "utf8", function (err , contents){
		if(err){
			res.writeHead(503, { "Content-Type" : "text/html" });
			res.end("Unable to find the required file");
			return ;			
		}
		
		res.writeHead(200, {"Content-Type"  : "text/html"});
		res.end(contents);
	});	
}

exports.showEditFruitPage = function(req, res){
	console.log("Inside addNewFruit... "+ JSON.stringify(req.params.fruitname));
	
		if(fruits){
			fruits.findOne({"name" : req.params.fruitname}, function(err, doc){
			console.log("Error: "+err);
			console.log(JSON.stringify(doc));
			
			res.render("editFruit.html", doc);
		});
		}else{
			res.json(503 , {});
		}
	
		//res.writeHead(200, {"Content-Type"  : "text/html"});
		//res.end(contents);
	
}