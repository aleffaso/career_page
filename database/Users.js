const Sequelize = require("sequelize");
const connection = require("./database");

const Users = connection.define('users',{ //Create database with "User" name
    name:{
        type: Sequelize.STRING,
        allowNull: false //Need to fill the field
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Users.sync({force:false}).then(() => {}); //In case of database "Users" does not exist, it forces to create it

module.exports = Users; 