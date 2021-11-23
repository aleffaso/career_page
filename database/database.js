const Sequelize = require ("sequelize");
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const connection = new Sequelize('jobdescription', 'root', process.env.DATABASE_PASSWORD,{ //Database set up
    host: 'localhost', // Whenever you want to run in a server you can replace localhost with the IP address
    dialect: 'mysql'
});

module.exports = connection;