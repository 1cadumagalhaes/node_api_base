const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
const Boom = require('@hapi/boom');


class UsersRoutes extends BaseRoute {
    constructor(db) {
        super();
        this.db = db;
        this.path = '/users'
        this.isConnected = this.db.isConnected();
    }

    create() {
        const handler = async (request, headers) => {
            const payload = request.payload;
            const result = await this.db.create(payload);
            if (!result) return Boom.preconditionFailed('Could not create user');
            return result.dataValues;
        }
        if (this.isConnected)
            return this._post(
                `${this.path}`,
                handler,
                {
                    tags: ['users'],
                    description: 'Insert a new user',
                    notes: 'Must pass nome and poder'
                },
                {
                    payload: Joi.object({
                        nome: Joi.string().min(3).max(20).required(),
                        poder: Joi.string().min(3).max(20).required(),
                    }),
                }
            );
        else Boom.internal('Could not connect to the database');
    }

    readAll() {
        if (this.isConnected)
            return this._get(
                this.path,
                async (request, headers) => await this.db.read(),
                {
                    tags: ['users'],
                    description: 'Lists all users',
                    notes: 'Returns an array with all users '
                }
            );
        else Boom.internal('Could not connect to the database');
    }

    readOne() {
        const handler = async (request, headers) => {
            const id = request.params.id || null;
            const [result] = await this.db.read({ id });
            if (!result) return Boom.preconditionFailed('User not found');
            return result;
        }
        if (this.isConnected)
            return this._get(
                `${this.path}/{id}`,
                handler,
                {
                    tags: ['users'],
                    description: 'Lists one user',
                    notes: 'ID must be valid'
                },
                {
                    params: Joi.object({
                        id: Joi.number().integer().required()
                    })
                }
            );
        else Boom.internal('Could not connect to the database');
    }

    update() {
        const handler = async (request, headers) => {
            const id = request.params.id;
            const payload = request.payload;
            const [result] = await this.db.update(id, payload);
            if (!result) return Boom.preconditionFailed('Could not create user');
            return 'User updated';
        }
        if (this.isConnected)
            return this._update(
                `${this.path}/{id}`,
                handler,
                {
                    tags: ['users'],
                    description: 'Update a user',
                    notes: 'Must pass id, and nome or poder'
                },
                {
                    params: Joi.object(
                        {
                            id: Joi.number().integer().required()
                        }
                    ),
                    payload: Joi.object({
                        nome: Joi.string().min(3).max(20),
                        poder: Joi.string().min(3).max(20),
                    }),
                }
            );
        else Boom.internal('Could not connect to the database');
    }

    delete() {
        const handler = async (request, headers) => {
            const id = request.params.id || null;
            const result = await this.db.delete(id);
            if (!result) return Boom.preconditionFailed('User not found');

            return `User ${id} deleted`;
        }
        if (this.isConnected)
            return this._delete(
                `${this.path}/{id}`,
                handler,
                {
                    tags: ['users'],
                    description: 'Deletes one user',
                    notes: 'ID must be valid'
                },
                {
                    params: Joi.object({
                        id: Joi.number().integer().required()
                    })
                }
            );
        else Boom.internal('Could not connect to the database');
    }

}

module.exports = UsersRoutes;

// read
// return {
//     path: '/users',
//     method: 'GET',
//     config: {
//         tags: ['api', 'users'],
//         description: 'Lists all users',
//         notes: 'Returns an array with all users '
//     },
//     handler: async (request, headers) => {
//         try {
//             return this.db.read();
//         } catch (error) {
//             console.error(`Error on GET /users`, error);
//             return Boom.internal();
//         }
//     }
// }