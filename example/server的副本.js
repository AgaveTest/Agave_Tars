
/**
 * Module requirements.
 */

var express = require('express')
  // , search = require('./search')

/**
 * Create app.
 */

var app = express().use(bodyParser.json());

/**
 * Configuration
 */

// app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });

/**
 * Routes
 */

// app.get('/', function (req, res) {
//   console.log(req.body);
//   res.send("Hello I'm TARS!");

// });
// app.post('/', function (req, res) {
//   console.log(req.body);
//   res.send("Hello I'm TARS! post");

// });
app.route('/')
// .all(function(req,res,next){
// 	//run all
// 	console.log("in all");
// 	res.send("Hello I'm TARS! ALL");
// })
.get(function(req,res,next){
	//run get
	console.log("in get");
	res.send("Hello I'm TARS! GET");

})
.post(function(req,res,next){
	//run get
	console.log("in POST");
	console.log();
	res.send("Hello I'm TARS! POST");
})

// app.get('/search', function (req, res, next) {
//   search(req.query.q, function (err, tweets) {
//     if (err) return next(err);
//     res.render('search', { results: tweets, search: req.query.q });
//   });
// });

/**
 * Listen
 */

app.listen(3000);
