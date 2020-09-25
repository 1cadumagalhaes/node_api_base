const { strictEqual, deepStrictEqual, ok } = require('assert');
const api = require('../app');
let app = {}

const DEFAULT_USER_INSERT = { nome: `Steve-${Date.now()}`, poder: 'Gato Laranja' };
let DEFAULT_USER_ID = '';
const isEmpty = (obj) => Object.keys(obj).length === 0;

const request = (url = '/', method = 'GET', headers = {}, payload = {}) => {
    let object = {
        url,
        method
    }
    if (!isEmpty(headers)) object['headers'] = headers;
    if (!isEmpty(payload)) object['payload'] = payload;

    return object;
}

/*-------------- base -------------------*/
describe('API Base testing', function () {
    this.beforeAll(async () => {
        app = await api;
    });

    it('GET /', async () => {
        const { statusCode, payload } = await app.inject(request());
        deepStrictEqual(statusCode, 200);
    });

});

/*-------------- users -----------------*/

describe('API users testing', function () {
    this.beforeAll(async () => {
        app = await api;
    });

    it('GET /users', async () => {
        const { statusCode, payload } = await app.inject(request('/users'));
        ok(payload);
        deepStrictEqual(statusCode, 200);
    });

    it('POST /users', async () => {
        let { statusCode, payload } = await app.inject(request(
            '/users',
            'POST',
            {},
            DEFAULT_USER_INSERT
        ));
        deepStrictEqual(statusCode, 200);
        payload = JSON.parse(payload);
        DEFAULT_USER_ID = payload.id;
        delete payload.id;
        deepStrictEqual(payload, DEFAULT_USER_INSERT);
    });

    it('GET /users/{id}', async () => {
        const { statusCode, payload } = await app.inject(request('/users/104'));
        deepStrictEqual(statusCode, 200);
        deepStrictEqual(JSON.parse(payload), { id: 104, nome: 'Minerva', poder: "Gato" });
    });

    it('PUT /users/{id}', async () => {
        const id = DEFAULT_USER_ID;
        const { statusCode, payload } = await app.inject(
            request(`/users/${id}`, 'PUT', {}, {
                ...DEFAULT_USER_INSERT,
                nome: 'Stephen',
                poder: 'Inteligencia',
            })
        )
        deepStrictEqual(statusCode, 200);
        deepStrictEqual(payload, `User updated`);
    });

    it('DELETE /users/{id}', async () => {
        const id = DEFAULT_USER_ID;
        const {
            statusCode,
            payload
        } = await app.inject(request(
            `/users/${id}`,
            'DELETE', {},

        ));
        deepStrictEqual(statusCode, 200);
        deepStrictEqual(payload, `User ${id} deleted`);
    });

});

/*-------------- teams -----------------*/