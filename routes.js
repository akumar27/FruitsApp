var express = require("express");

module.exports = function(app){
	app.use("/" , express.static("./static"));
	
	var fruits = require("./fruits_controller");
	
	app.get("/pages/allFruits.json" , fruits.getAllFruits);
	
	app.get("/pages/home", fruits.home);	
	
	app.post("/action/newFruit", fruits.addNewFruitInDB);
	
	app.get("/pages/addNewFruit", fruits.showNewFruitPage);
		
	app.get("/pages/editFruit/:fruitname", fruits.showEditFruitPage);
	
	app.post("/action/editFruit", fruits.editFruitInDB);
	
	app.get("/action/deleteFruit/:fruitname", fruits.deleteFruitFromDB);
}