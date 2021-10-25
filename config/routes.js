const express = require("express");
const routes = express.Router();
const jobs = require("./database/Jobs");

//Render main page
routes.get('/', (req, res) =>{
    res.render('index');
});

//Render job page
routes.get('/vagas', (req,res) => {
    res.render('vagas');
});

routes.get("/vagas", (req, res) => {
    jobs.findAll({raw: true, order:[
        ['id', 'DESC'] //Order inverted
    ]}).then(jobs => {// As well as SELCT * FROM questions 
        res.render("index",{
            jobs: jobs //Show all jobs at the job page
        });
    });  
});

routes.post("/savejob", (req,res) => { //Saving the questions asked associated to createjob.js
    var area = req.body.area;
    var title = req.body.title;
    var day = req.body.day;
    var abilities = req.body.abilities;
    var difference = req.body.difference; 
    questionModule.create({ //INSER INTO ..... + ..... SQL
        area: area,//Associated to database Job
        title: title, 
        day: day,
        abilities: abilities,
        difference: difference,
    }).then(() => {
        res.redirect("/vagas"); //Redirect to vagas.ejs
    });

});

module.exports = routes;