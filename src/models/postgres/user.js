require('dotenv').config();
const { POSTGRES_TABLE } = process.env;

const Sequelize = require('sequelize');
const UserSchema = {
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: Sequelize.STRING,
            required: true,
        },
        poder: {
            type: Sequelize.STRING,
            required: true,
        },
    },
    options: {
        tableName: POSTGRES_TABLE,
        freezeTableName: false,
        timestamps: false,
    }
}

module.exports = UserSchema;