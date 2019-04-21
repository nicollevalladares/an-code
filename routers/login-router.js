module.exports = (app, passport) => {

	app.get('/', (req, res) => {
		res.render('index');
	});

	//login view
	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/menu',
		failureRedirect: '/login',
		failureFlash: true
	}));


	//profile view
	app.get('/menu', isLoggedIn, (req, res) => {
		res.render('menu', {
			user: req.user
		});
	});


function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

}