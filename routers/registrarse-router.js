module.exports = (app, passport) => {

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

}