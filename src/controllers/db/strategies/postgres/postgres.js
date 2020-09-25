require('dotenv').config();

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST } = process.env;


const interfaceDB = require('../base/interface');
const Sequelize = require('sequelize');

class PostgreSQLStrategy extends interfaceDB {
    constructor(connection, schema) {
        super();
        this._db = schema;
        this._connection = connection;
    }

    static async defineModel(connection, schema) {
        const model = connection.define(schema.name, schema.schema, schema.options);
        await model.sync();
        return model;
    }

    static async connect() {
        const sequelize = new Sequelize(
            POSTGRES_DB,
            POSTGRES_USER,
            POSTGRES_PASSWORD,
            {
                host: POSTGRES_HOST,
                dialect: 'postgres',
                quoteIdentifiers: false, //case sensitive
                operatorsAliases: 0, //depreacation warning
                logging: false, //disable logging
            }
        );
        return sequelize;
    }

    async isConnected() {
        try {
            await this._connection.authenticate();
            console.info('PostgreSQL running')
            return true;
        } catch (error) {
            console.error('Error on the connection with PostgreSQL', error);
            return false;
        }
    }

    create(item) {
        return this._db.create(item, { raw: true });
    }

    read(item = {}) {
        return this._db.findAll({
            where: item,
            raw: true
        });
    }

    update(id, item) {
        return this._db.update(item, {
            where: {
                id
            }
        });
    }

    delete(id) {
        const query = id ? { id } : {};
        return this._db.destroy({
            where: query
        });
    }
}

module.exports = PostgreSQLStrategy;