const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create User model
class User extends Model {
    // set up method to run to check password with bcrypt
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

// define table columns and configuration
User.init({
    // define an id column
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // define a username column
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // define a password column 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            //at least 4 character pw
            len: [4]
        }
    }
}, {
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },

        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    //pass in sequelize connection (connect to database)
    sequelize,
    //does not automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // does not pluralize name of database table
    freezeTableName: true,
    //use underscores instead of camelcase
    underscored: true,
    //model name stays lowercase in the database
    modelName: 'user'
});

module.exports = User;