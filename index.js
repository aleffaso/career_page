const express  = require("express"); //Import framework 
const app = express(); //Use framework
const bodyParser = require("body-parser"); //Use to put serial info
//const routes = require('./config/routes'); // organize routes
const connection = require("./database/database"); // Database MySQL
const jobs = require("./database/Jobs");

//Connect to database
connection.authenticate()
.then(()=>{
    console.log("Database connected")
})
.catch((error) => {
    console.log(error);
});

 //Run EJS to render HTML
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Body parser to use partials
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Use routes from config
//app.use(routes);

//Render main page
app.get('/', (req, res) =>{
    res.render('index');
});

//Render job page
//app.get('/vagas', (req,res) => {
//    res.render('vagas');
//});

app.get("/vagas", (req, res) => {
    jobs.findAll({raw: true, order:[
        ['id', 'DESC'] //Order inverted
    ]}).then(jobs => {// As well as SELCT * FROM questions 
        res.render("vagas",{
            jobs: jobs //Show all jobs at the job page
        });
    });  
});

app.get("/createjob", (req,res) => {
    res.render("jobs/createjob");
});

app.post("/savejob", (req,res) => { //Saving the questions asked associated to createjob.js
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
        difference: difference
    }).then(() => {
        res.redirect("/"); //Redirect to vagas.ejs
    });

});

app.get("/jobdescription/:id",(req,res) => { // Search for questions by id
    var id = req.params.id;
    jobs.findOne({
        where: {id: id} //Compare id from table and parameter
    }).then(jobs => { // Variable created to bypass information
        if(jobs){
            res.render("jobs/jobdescription", {
                jobs: jobs //variable relating the database
            });
        }else{
            res.redirect("../vagas"); //Redirect to index.ejs
        };
    });
});

//Server open in 3000 port
app.listen(3000,() =>{ 
    console.log("Server Running");
});