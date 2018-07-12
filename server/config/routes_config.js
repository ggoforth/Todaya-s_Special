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
    app.post('/send', user.sendmail)
    app.get('/find/:id', user.getOneDish)

}