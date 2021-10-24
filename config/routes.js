const express = require("express");
const routes = express.Router();

//Render main page
routes.get('/', (req, res) =>{
    res.render('index');
});

//Render job page
routes.get('/vagas', (req,res) => {
    res.render('vagas');
});


module.exports = routes