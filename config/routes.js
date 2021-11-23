const express = require("express");
const routes = express.Router();
const jobs = require("../database/Jobs");
const users = require("../database/Users");
//const authController = require('../controllers/auth');

//Render main page
routes.get("/", (req, res) =>{
    jobs.findAll({raw: true, order:[
        ['area', 'ASC'] //DESC for order inverted
    ]}).then(jobs => {// As well as SELCT * FROM jobdescription 
        res.render("index",{
            jobs: jobs //Show all jobs at the index #apply page
        });
    }); 
});

//Create login route
routes.get("/login", (req,res) => {
    res.render("login");
});


//Create user register route
routes.get("/createuser", (req,res) => {
    res.render("jobs/createuser");
});

//Survey to save users
routes.post("/saveuser", (req,res) => { //Saving users related to createuser.ejs
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var passwordConfirmed = req.body.passwordConfirmed;
    users.create({ //INSER INTO ..... + ..... SQL
        name: name,//Associated to database User
        email: email, 
        password: password,
    }).then(() => {
        //res.redirect("/");
    });
});

//Create job route
routes.get("/createjob", (req,res) => {
    res.render("jobs/createjob");
});

//Survey to save jobs
routes.post("/savejob", (req,res) => { //Saving the job descriptions related to createjob.ejs
    var area = req.body.area;
    var title = req.body.title;
    var day = req.body.day;
    var ability = req.body.ability;
    var difference = req.body.difference; 
    jobs.create({ //INSER INTO ..... + ..... SQL
        area: area,//Associated to database Job
        title: title, 
        day: day,
        ability: ability,
        difference: difference,
    }).then(() => {
        res.redirect("/#apply"); //Redirect to vagas.ejs
    });
});

//show job description page
routes.get("/jobdescription/:id",(req,res) => { // Search for job by id
    var id = req.params.id;
    jobs.findOne({
        where: {id: id} //Compare id from table and parameter
    }).then(jobs => { // Variable created to bypass information
        if(jobs){
            res.render("jobs/jobdescription", {
                jobs: jobs //variable relating the database
            });
        }else{
            res.redirect("/vagas"); //Redirect to vagas.ejs
        };
    });
});

//Exports all routes
module.exports = routes;