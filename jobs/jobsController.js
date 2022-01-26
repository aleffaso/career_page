const express = require('express');
const routes = express.Router();
const Jobs = require('./Job');
const adminAuth = require("../middlewares/adminAuth");


//Jobs view route
routes.get("/admin/jobs", adminAuth, (req,res) => {
    Jobs.findAll({raw: true, order:[
        ['id', 'DESC'] //DESC for order inverted
    ]}).then(jobs => {// As well as SELCT * FROM jobdescription 
        res.render("admin/jobs/index",{
            jobs: jobs //Show all jobs at the index #apply page
        });
    }); 
});

//Create job route
routes.get("/admin/jobs/new", adminAuth, (req,res) => {
    res.render("admin/jobs/new");
});

//Survey to save jobs
routes.post("/jobs/save", (req,res) => { //Saving the job descriptions related to index.ejs
    var area = req.body.area;
    var title = req.body.title;
    //var day = req.body.day;
    //var ability = req.body.ability;
    //var difference = req.body.difference; 
    var link = req.body.link;
    Jobs.create({ //INSER INTO ..... + ..... SQL
        area: area,//Associated to database Job
        title: title, 
        //day: day,
        //ability: ability,
        //difference: difference
        link: link
    }).then(() => {
        res.redirect("/admin/jobs"); //Redirect to index.ejs
    });
});

//Delete route
routes.post("/jobs/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){ //is it a number or not?
            Jobs.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/jobs");
            });
        }else{
            res.redirect("/admin/jobs");
        }
    }else{
        res.redirect("/admin/jobs");
    }
});

//Find specific data by id
routes.get("/admin/jobs/edit/:id", adminAuth, (req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/jobs");
    };

    Jobs.findByPk(id).then(jobs => { //Search job by its ID
        if(jobs != undefined){
            res.render("admin/jobs/edit", {jobs: jobs});
        }else{
            res.redirect("/admin/jobs");
        }
    });
});

//Update route
routes.post("/jobs/update", adminAuth, (req,res) => {
    var id = req.body.id;
    var area = req.body.area;
    var title = req.body.title;
    //var day = req.body.day;
    //var ability = req.body.ability;
    //var difference = req.body.difference; 
    var link = req.body.link;

    Jobs.update({area: area, title: title, link:link},{ //Update by specified id
        where: {
            id:id
        }
    }).then(() => {
        res.redirect("/admin/jobs");
    });
});

module.exports = routes;