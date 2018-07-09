const user = require('../controllers/controller.js')

module.exports = function(app){
    app.post('/register', user.register)
    app.post('/login', user.login)
    app.get('/logout', user.logout)
    app.post('/addDish', user.add)
    app.get('/showDish', user.showDish)
    app.get('/dishes', user.dishes)
    app.get('/getOneDish/:id', user.getOneDish)
    app.delete('/delete/:id', user.deleteDish)
    app.get('/search/:zipcode', user.search)
    app.put('/edit/:id', user.edit)


    
    // app.get('/all', user.getPet)
    // app.delete('/delete/:id', user.deletePet)
    // app.put('/edit/:id', user.updatePet)
    // app.get('/show/:id', user.showPet)
    // app.post('/like/:id', user.like)
}