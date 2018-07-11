const mongoose = require('mongoose');
const User = mongoose.model('User');
const Food = mongoose.model('Food');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codingschooltesting@gmail.com',
        pass: 'codingtesting'
    }
});

module.exports = {
    sendmail: function (req, res) {
        console.log(req.body)
        transporter.sendMail(req.body, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
    register: function (req, res) {
        console.log(req.body)
        User.find({ email: req.body.email }, function (err, user) {
            if (user.length) {
                console.log('user exist')
                res.json({ Status: false, err: "Invalid entry" })
            } else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) {
                        console.log('pw not ok');
                        res.json({ Status: false, err: "Invalid entry" })
                    } else {
                        console.log(hash)
                        var newUser = new User({ fname: req.body.fname, lname: req.body.lname, email: req.body.email, password: hash, spec: req.body.spec });
                        newUser.save(function (err, user) {
                            if (err) {
                                res.json({ Status: false, Error: err })
                            } else {
                                req.session.user = { id: user._id }
                                res.json({ Status: true, user: user, Login: true })
                            }
                        })
                    }
                })
            }
        });
    },

    login: function (req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {
            console.log(user)
            if (user) {
                bcrypt.compare(req.body.password, user.password, function (err, data) {
                    console.log(data)
                    if (data) {
                        console.log(data)
                        req.session.user = { id: user._id }
                        console.log(req.session.user)
                        res.json({ Login: true, user: user })

                    } else {
                        res.json({ Login: false, msg: "Invalid entry" })
                    }
                })
            } else {
                res.json({ Login: false, msg: "Invalid entry" })
            }
        })
    },
    logout: function (req, res) {
        req.session.destroy(function (err) {
            res.json({ Login: false })
        })
    },
    add: function (req, res) {
        console.log(req.body)
        var food = new Food(req.body)
        var userId = req.session.user.id
        console.log(userId)
        food.cook = userId
        food.save(function (err, dish) {
            if (err) {
                console.log('somethig went worng');
                res.json({ Status: false, Error: err })
            } else {
                console.log('successfully added a user');
                console.log(req.session.user.id)
                User.findByIdAndUpdate({ _id: req.session.user.id }, { $push: { food: dish } }, function (err, user) {
                    if (err) {
                        console.log('somethig went worng');
                        res.json({ message: "Error", error: err })
                    } else {
                        console.log('successfully updated a user', user);
                        res.json({ Status: true, message: "Success" })
                    }

                })

            }

        })
    },
    showDish: function (req, res) {
        User.findOne({ _id: req.session.user.id }, function (err, user) {
            var data = user.food;
            if (err) {
                console.log('somethig went worng');
                res.json({ Status: false, message: "Error", error: err })
            } else {
                // console.log(data);
                res.json({ Status: true, message: "Success", food: data });
            }

        })
    },
    dishes: function (req, res) {
        Food.find({}, function (err, food) {
            if (err) {
                console.log("Returned error", err);
                res.json({ message: "Error", error: err })
            }
            else {
                res.json({ data: food })
            }
        })
    },
    getOneDish: function (req, res) {

        Food.findOne({ _id: req.params.id }).populate('cook').exec(function (err, food) {
            if (err) {
                console.log('somethig went worng');
                res.json({ message: "Error", error: err })
            } else {
                console.log(food)
                res.json({ message: "Success", data: food });
            }

        })
    },
    deleteDish: function (req, res) {
        console.log("session", req.session.user)
        Food.findByIdAndRemove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log('somethig went worng');
                res.json({ message: "Error", error: err })
            } else {
                User.findById({ _id: req.session.user.id }, function (err, user) {
                    if (err) {
                        console.log("can't find user");
                        res.json({ message: "Cannot find this user", error: err })
                    } else {
                        var newFood = user.food;
                        for (var i = 0; i < newFood.length; i++) {
                            console.log(newFood[i])
                            if (newFood[i]._id == req.params.id){
                                var temp = newFood[i];
                                newFood[i] = newFood[newFood.length - 1];
                                newFood[newFood.length - 1] = temp
                                newFood.pop()
                            }
                        }
                        User.findByIdAndUpdate({ _id: req.session.user.id }, { $set: {food : newFood} }, function(err, user){
                            if (err){
                                console.log("cannot update")
                                res.json({message: "cannot update"})
                            } else {
                                console.log('successfully adopted this pet');
                                res.json({ message: "Success delete", user });
                            }
                        })
                    }
                })
            }
        })
    },
    search: function(req, res){
        console.log(req.params.zipcode)
        Food.find({zip: req.params.zipcode}, function (err, foods){
            if(err){
                console.log("not found");
                res.json({message: "not found", Error: err})
            } else {
                res.json({food: foods})
            }
        })
    },
    edit: function(req, res){
        Food.findByIdAndUpdate({ _id: req.body._id }, { $set: req.body }, function (err, dish) {
            if (err) {
                console.log('somethig went worng');
                res.json({ message: "Error", error: err })
            } else {
                console.log(dish)
                User.findById({ _id: req.session.user.id }, function (err, user) {
                    if (err) {
                        console.log("can't find user");
                        res.json({ message: "Cannot find this user", error: err })
                    } else {
                        var newFood = user.food;
                        for (var i = 0; i < newFood.length; i++) {
                            // console.log(newFood[i])
                            if (newFood[i]._id == req.body._id){
                                newFood[i] = dish
                            }
                        }
                        // console.log('NEWFOOD', newFood)
                        User.findByIdAndUpdate({ _id: req.session.user.id }, { $set: {food : newFood} }, function(err, user){
                            if (err){
                                console.log("cannot update")
                                res.json({message: "cannot update"})
                            } else {
                                console.log('successfully adopted this pet');
                                res.json({ message: "Success delete", user });
                            }
                        })
                    }
                })
            }
        })
    }

}