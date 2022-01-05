const express = require("express");
const routes = express.Router();
const jobs = require("../jobs/Job");

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

//show job description page
routes.get("/jobs/:id", (req,res) => { // Search for job by id
    var id = req.params.id;
    jobs.findOne({
        where: {id: id} //Compare id from table and parameter
    }).then(jobs => { // Variable created to bypass information
        if(jobs){
            res.render("jobs", {
                jobs: jobs //variable relating the database
            });
        }else{
            res.redirect("/"); //Redirect to vagas.ejs
        };
    });
});


//Exports all routes
module.exports = routes;