module.exports = (app, passport) => {


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

	// signup view
	app.get('/registrarse', (req, res) => {
		res.render('registrarse', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/registrarse', passport.authenticate('local-registrarse', {
		successRedirect: '/menu',
		failureRedirect: '/registrarse',
		failureFlash: true // allow flash messages
	}));

	//profile view
	app.get('/menu', isLoggedIn, (req, res) => {
		res.render('menu', {
			usuarios: req.usuario
		});
	});


function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

}