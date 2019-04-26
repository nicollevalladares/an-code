module.exports = (app) => {

	app.get('/perfil', (req, res) => {
		res.render('perfil', {
			user: req.user
	});
    
});

}