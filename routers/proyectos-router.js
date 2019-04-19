module.exports = (app, proyecto) => {

    app.get('/proyectos', (req, res) => {
        res.render('proyectos')
    });
    
    }