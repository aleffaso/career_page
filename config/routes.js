const express = require("express");
const routes = express.Router();
const jobs = require("../database/Jobs");

//Render main page
routes.get("/", (req, res) =>{
    res.render("index");
});

//Show job data
routes.get("/vagas", (req, res) => {
    jobs.findAll({raw: true, order:[
        ['area', 'ASC'] //DESC for order inverted
    ]}).then(jobs => {// As well as SELCT * FROM questions ç
        res.render("vagas",{
            jobs: jobs //Show all jobs at the job page
        });
    });  
});

//Create job route
routes.get("/createjob", (req,res) => {
    res.render("jobs/createjob");
});

//Show survey to save jobs
routes.post("/savejob", (req,res) => { //Saving the job descrpitions related to createjob.js
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
        res.redirect("vagas"); //Redirect to vagas.ejs
    });
});

//show job description page
routes.get("/jobdescription/:id",(req,res) => { // Search for questions by id
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