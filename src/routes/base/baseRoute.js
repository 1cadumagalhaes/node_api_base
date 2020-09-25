
const Boom = require('@hapi/boom');

const isEmpty = (obj) => Object.keys(obj).length === 0;


class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype).filter(method => method != 'constructor' && !method.startsWith('_'));
    }
    _get(path, callback, { tags = [], description = '', notes = '' }, validate = {}) {
        const method = 'GET'
        let object = {
            method,
            path,
            config: {
                tags: ['api']
            },
            handler: async function (request, headers) {
                try {
                    return callback(request, headers);
                } catch (error) {
                    console.error(`Error on ${method} ${path}`, error);
                    return Boom.internal();
                }
            }
        };
        if (!isEmpty(validate)) {
            //object.options = {};
            object.config['validate'] = validate;
        }
        if (tags) object.config.tags.concat(tags.filter(t => t != 'api'))
        if (description) object.config['description'] = description
        if (notes) object.config['notes'] = notes;

        return object;
    }

    _post(path, callback, { tags = [], description = '', notes = '' }, validate = {}) {
        const method = 'POST'
        let object = {
            method,
            path,
            config: {
                tags: ['api']
            },
            handler: async function (request, headers) {
                try {
                    return callback(request, headers);
                } catch (error) {
                    console.error(`Error on ${method} ${path}`, error);
                    return Boom.internal();
                }
            }
        };
        if (!isEmpty(validate)) {
            //object.options = {};
            object.config['validate'] = validate;
        }
        if (tags) object.config.tags.concat(tags.filter(t => t != 'api'))
        if (description) object.config['description'] = description
        if (notes) object.config['notes'] = notes;

        return object;
    }


    _update(path, callback, { tags = [], description = '', notes = '' }, validate = {}) {
        const method = ['PUT']
        let object = {
            method,
            path,
            config: {
                tags: ['api']
            },
            handler: async function (request, headers) {
                try {
                    return callback(request, headers);
                } catch (error) {
                    console.error(`Error on ${method} ${path}`, error);
                    return Boom.internal();
                }
            }
        };
        if (!isEmpty(validate)) {
            //object.options = {};
            object.config['validate'] = validate;
        }
        if (tags) object.config.tags.concat(tags.filter(t => t != 'api'))
        if (description) object.config['description'] = description
        if (notes) object.config['notes'] = notes;

        return object;
    }


    _delete(path, callback, { tags = [], description = '', notes = '' }, validate = {}) {
        const method = 'DELETE'
        let object = {
            method,
            path,
            config: {
                tags: ['api']
            },
            handler: async function (request, headers) {
                try {
                    return callback(request, headers);
                } catch (error) {
                    console.error(`Error on ${method} ${path}`, error);
                    return Boom.internal();
                }
            }
        };
        if (!isEmpty(validate)) {
            //object.options = {};
            object.config['validate'] = validate;
        }
        if (tags) object.config.tags.concat(tags.filter(t => t != 'api'))
        if (description) object.config['description'] = description
        if (notes) object.config['notes'] = notes;

        return object;
    }
}

module.exports = BaseRoute;