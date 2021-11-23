const express  = require("express"); //Import framework 
const app = express(); //Use framework
const bodyParser = require("body-parser"); //Use to put serial info
const routes = require("./config/routes"); // organize routes
const connection = require("./database/database"); // Database MySQL

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
//Render all css and js config
app.use(express.static('public'));

//Body parser to use partials (as sent by html forms)
app.use(bodyParser.urlencoded({extended: false}));
//as sent by API clients
app.use(bodyParser.json());

//Use routes from config
app.use(routes);

//Server open in 3000 port
app.listen(3000,() => { 
    console.log("Server Running");
});