const express  = require("express"); //Import framework 
const app = express(); //Use framework
const bodyParser = require("body-parser"); //Use to put serial info
const session = require("express-session");
const dotenv = require('dotenv');
const routes = require("./config/routes"); // organize routes
const usersController = require("./users/usersController");
const jobsController = require("./jobs/jobsController");
const connection = require("./database/database"); // Database MySQL

dotenv.config({path: './.env'});

//Connect to database
connection.authenticate()
.then(()=>{
    console.log("Database connected")
})
.catch((error) => {
    console.log(error);
});

//Sessions
app.use(session({
    secret: process.env.SESSION_SECRET, //more radom better
    resave: false, //resave session values if nothing is change
    saveUninitialized: false // save empty value in the session
}));

 //Run EJS to render HTML
app.set('view engine', 'ejs');

//Render all css and js config
app.use(express.static('public'));

//Body parser to use partials (as sent by html forms)
app.use(bodyParser.urlencoded({extended: false}));

//as sent by API clients
app.use(bodyParser.json());

//Use routes from folders
app.use("/", usersController);
app.use("/", jobsController);
app.use("/", routes);

//Server open in 3000 port
app.listen(3000,() => { 
    console.log("Server Running");
});