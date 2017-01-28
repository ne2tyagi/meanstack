var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res){
	res.render('register',{title: 'Register'});
});

router.get('/login', function(req, res){
	res.render('login',{
		title: 'Login'
	})
})
router.post('/register', function(req, res){
	console.log(req.body)
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	
	if(req.files.profileImage){
		//File Info
		var profileImageOriginalName = req.files.profileImage.originalname;
		var profileImageName = req.profileImage.name;
		var profileImageMine = req.profileImage.mimetype;
		var profileImagePath = req.profileImage.path;
		var profileImageExt = req.profileImage.extension;
		var profileImageSize = req.profileImage.size;
	}else{
		//Set Default Image
		var profileImageName = 'noimage.png';
	}
	
	//Check for errors
	req.checkBody('name', 'Name Field is required').notEmpty();
	req.checkBody('email', 'Email Field is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Usename field is required');
	req.checkBody('password', 'Password Field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
	
	//Check for errors
	var errors = req.validationErrors();
	
	if(errors){
		res.render('register',{
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			password2: password2
		});
	}else{
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password,
			profileImage: profileImageName
		});
		
		// Create User
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});
		
		req.flash('success', 'You are now registered and may login');
		res.location('/');
		res.redirect('/');
	}
});

module.exports = router;
