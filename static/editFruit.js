$(function(){
	var tmpl; 
	var data = {};	
	var initPage = function(){
		
		//Load the product.html page
		$.get("/editFruitContent.html" , function(d){
			tmpl = d; 
		});
		
		$.getJSON("/pages/fruitname.json", function(d){
	//	alert(JSON.stringify(d));
			data = d; 			
		});
		
		$(document).ajaxStop(function(){
		//console.log(JSON.stringify(data));
		data = {"fruits" : data};
		//alert(JSON.stringify(data));
			var pageContents = Mustache.to_html(tmpl , data);
			$("body").html(pageContents);
		});
	}();
});
