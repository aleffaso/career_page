const Sequelize = require("sequelize");
const connection = require("./database");

const Jobs = connection.define('jobs',{ //Create database with "Jobs" name
    area:{
        type: Sequelize.STRING,
        allowNull: false //Need to fill the field
    },
    title:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    day:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    ability:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    difference:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Jobs.sync({force:false}).then(() => {}); //In case of database "Jobs" does not exist, it forces to create it

module.exports = Jobs; 