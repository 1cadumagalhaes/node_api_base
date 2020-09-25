const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('@hapi/boom');
class TeamsRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
    }

    _create() {

    }

    _read() {

    }

    _update() {

    }

    _delete() {

    }

}

module.exports = TeamsRoutes;