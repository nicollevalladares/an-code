module.exports = (app, proyecto) => {

    app.get('/proyectos', (req, res) => {
        res.render('proyectos.ejs',
        
        proyecto.find().sort({orden:1})
        .then(data=>{
            res.send(data);
        })
        .catch(error=>{
            res.send(error);
        }))
    });
    
    }