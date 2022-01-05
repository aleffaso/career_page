const express = require('express');
const bcrypt = require('bcrypt');
const routes = express.Router();
const User = require('./User');
const adminAuth = require("../middlewares/adminAuth");


//Create login route
routes.get("/login", (req,res) => {
    res.render("admin/users/login");
});

//Authenticate user
routes.post("/authenticate", (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email:email}}).then(user => {
        if(user != undefined){
            var checkPassword = bcrypt.compareSync(password,user.password);
            
            if(checkPassword){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("admin/jobs");
            }else{
                res.redirect("/login");
            };
        }else{
            res.redirect("/login");
        };
    });
});

//Log user out
routes.get("/logout", (req,res) => {
    req.session.user = undefined;
    res.redirect("/login");
});

//Show all users
routes.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users:users});
    })
});

//Create new user
routes.get("/admin/users/new", adminAuth, (req, res) => {
    res.render("admin/users/new");
});

//Survey to save user
routes.post("/users/save", adminAuth, (req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then(user => {
        if(user == undefined){
            
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password,salt);

            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/admin/users");
            });
        }else{
            res.send("O email ja existe");
        }
    })
});

//Delete user
routes.post("/users/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){ //is it a number or not?
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/users");
            });
        }else{
            res.redirect("/admin/users");
        }
    }else{
        res.redirect("/admin/users");
    }
});

//Get user information route
routes.get("/admin/users/edit/:id", adminAuth, (req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/users");
    };

    User.findByPk(id).then(user => { //Search user by its ID
        if(user != undefined){
            res.render("admin/users/edit", {user: user});
        }else{
            res.redirect("/admin/users");
        }
    }).catch(err => {
        res.redirect("/admin/users");
    });
});

//Update information
routes.post("/users/update", adminAuth, (req,res) => {
    var id = req.body.id;
    var name= req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);

    User.update({name: name, email: email, password: hash},{
        where: {
            id:id
        }
    }).then(() => {
        res.redirect("/admin/users");
    }).catch(err => {
        res.redirect("/admin/users");
    });
});

module.exports = routes;