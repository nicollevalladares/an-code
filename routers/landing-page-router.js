module.exports = (app) => {

	app.get('/landing-page', (req, res) => {
		res.render('landing-page');
    });
    
}