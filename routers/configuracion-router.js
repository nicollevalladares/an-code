module.exports = (app) => {

	app.get('/configuracion', (req, res) => {
		res.render('configuracion');
    });
    
}