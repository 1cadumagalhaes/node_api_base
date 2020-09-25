require('dotenv').config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_DB, } = process.env;
const interfaceDB = require('../base/interface');
const Mongoose = require('mongoose');
const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
};


class MongoDB extends interfaceDB {
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._collection = schema;
    }

    static connect() {
        const path = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`;
        Mongoose.connect(path, { useUnifiedTopology: true, useNewUrlParser: true }, function (error) {
            if (!error) return;
            console.error('Error on the connection with MongoDB', error);
        });
        const connection = Mongoose.connection;
        connection.once('open', () => console.info('MongoDB running'));
        return connection;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState];
        if (state != 'Connecting') return state;

        await new Promise(resolve => setTimeout(resolve, 100));
        return this.isConnected();
    }

    async create(item) {
        return this._collection.create(item);
    }
    async read(item = {}) {
        return this._collection.find(item);
    }
    async update(id, item) {
        return this._collection.updateOne({ _id: id }, { $set: item });
    }
    async delete(id) {
        if (id)
            return this._collection.deleteOne({ _id: id });
        else return this._collection.deleteMany({});
    }


}


module.exports = MongoDB;