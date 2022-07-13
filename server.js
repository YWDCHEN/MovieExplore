let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/reviews', async (req, res) => {
	const {title, content, score, movie_id, email} = req.body;
	let connection = mysql.createConnection(config);
	let sql = `SELECT * FROM user WHERE email=?`;
	connection.query(sql, [email], (err, results) => {
		let user_id = 0
		if (results.length > 0) {
			user_id = results[0].userID;
		}
		sql = `INSERT INTO review(reviewTitle, reviewContent, reviewScore, user_userID, movies_id) VALUES (?, ?, ?, ?, ?)`;
		connection.query(sql, [title, content, score, user_id, movie_id], (error, results) => {
			connection.end();
			if (error) {
				return res.status(500).send(error.message);
			}
			return res.status(200).send();
		})
	})

})

app.get(`/api/movies/:movie_id`, async (req, res) => {
	const {movie_id} = req.params;
	let connection = mysql.createConnection(config);
	let sql = `SELECT *, movies.id as movieID FROM movies LEFT JOIN movies_genres ON movies.id = movies_genres.movie_id LEFT JOIN movies_directors ON movies.id=movies_directors.movie_id LEFT JOIN directors ON movies_directors.director_id=directors.id WHERE movies.id=?`;
	connection.query(sql, [movie_id], (error, results) => {
		if (error) {
			return res.status(500).send(error.message);
		}
		let movie = results[0];
		sql = `SELECT * FROM review, user WHERE movies_id=? AND review.user_userID=user.userID`;
		connection.query(sql, [movie.movieID], (error, results) => {
			connection.end();
			if (error) {
				return res.status(500).send(error.message);
			}
			movie.reviews = results;
			return res.status(200).json(movie);
		})

	})
})

app.get('/api/movies', async (req, res) => {
	let connection = mysql.createConnection(config);
	let sql = `SELECT *, movies.id as movieID FROM movies LEFT JOIN movies_genres ON movies.id = movies_genres.movie_id LEFT JOIN movies_directors ON movies.id=movies_directors.movie_id LEFT JOIN directors ON movies_directors.director_id=directors.id;`;
	connection.query(sql, [], (error, results) => {
		connection.end();
		if (error) {
			return res.status(500).send(error.message);
		}
		return res.status(200).json(results);
	})
})

app.post('/api/login', async (req, res) => {
	let connection = mysql.createConnection(config);
	let {email} = req.body;
	let sql = `SELECT * from user WHERE email = ?`;
	connection.query(sql, [email], (error, results) => {
		connection.end();
		if (error) {
			return res.status(500).send(error.message);
		}
		if (results.length === 0) {
			return res.status(403).send("You email not exists!");
		}
		return res.status(200).send(results[0]);
	})
})

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server