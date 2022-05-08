const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 5000
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var mysql = require('mysql');

// create a connection variable with the required details
var con = mysql.createConnection({
	host: "wavedata.c7csujiihzkb.ap-southeast-1.rds.amazonaws.com", // ip address of server running mysql
	user: "admin", // user name to your mysql database
	password: "Zakir%%$1", // corresponding password
	database: "WaveData" // use the specified database
});

// make to connection to the database.
con.connect(function (err) {
	if (err) throw err;
	// if connection is successful
	console.log('connection successful');
});


app.get('/serverless/student', (req, res) => {
	con.query("SELECT * FROM WaveData.student", function (err, resed, fields) {

		if (err) res.send(err);
		res.json(resed);
	});
})

const path = require('path')


app.use(express.static(path.join(__dirname, '../', 'build')));
app.get('/*', (req, res) => {
	//   res.send(path.join(__dirname, '../', 'build', 'index.html'))
	res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
})

app.get('/', (req, res) => {
	res.send(path.join(__dirname, '../', 'build', 'index.html'))
	res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
})



app.listen(PORT, () => {
	console.log(PORT);
})








