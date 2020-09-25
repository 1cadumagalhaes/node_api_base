const Interface = require('./interface');

class ContextStragegy extends Interface {

    constructor(database) {
        super();
        this._database = database;
    }
    isConnected() {
        return this._database.isConnected();
    }
    create(item) {
        return this._database.create(item);
    }
    read(item) {
        return this._database.read(item);
    }
    update(id, item) {
        return this._database.update(id, item);
    }
    delete(id) {
        return this._database.delete(id);
    }
}

module.exports = ContextStragegy;