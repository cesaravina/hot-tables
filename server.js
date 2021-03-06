// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Express
var app = express();
var PORT = 3000;

// Data Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Hot Tables
var hotTables = [
// 	name: 'Person 1',
// 	phone: "Phone Number",
// 	email: "Email",
// 	id: "Unique ID",
// }
];

var waitTables = [
// {
// 	name: 'Person 2',
// 	phone: "Phone Number",
// 	email: "Email",
// 	id: "Unique ID",
// }
]

// Routes
app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res){
	res.sendFile(path.join(__dirname, "view-tables.html"));
});

app.get("/reservations", function(req, res){
	res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/api/get-tables", function(req, res){
		return res.json(hotTables)
})

app.get("/api/get-waitlist", function(req, res){
		return res.json(waitTables)
});

app.post("/api/make-reservation", function(req, res){
	var newTable = req.body;
	// newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
	console.log(newTable);



	if(hotTables.length<=4){
		hotTables.push(newTable);
		newTable.wait = true;
	}else{
		waitTables.push(newTable)
		newTable.wait = false;
	}

	res.json(newTable);

});

// Listener
app.listen(PORT, function(){
	console.log("App listening on PORT "+ PORT);
});
