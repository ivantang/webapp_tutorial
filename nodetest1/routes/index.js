var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET Hello World page. */
router.get('/helloworld', function(req, res) {
	res.render('helloworld', { title: 'Hello, World!'});
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET new user page. */
router.get('/newuser', function(req, res){
	res.render('newuser', {title: 'Add New User'});
});

/* POST to add user service */
router.post('/adduser', function(req, res) {

	//set our internal DB Variable
	var db = req.db;

	//get our form values. these rely on the "name" attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//set our collection
	var collection = db.get('usercollection');

	//submit to the DB
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function (err, doc) {
		if (err) {
			//if it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// and foward to success page
			res.redirect("userlist");
		}
	});
});

module.exports = router;
