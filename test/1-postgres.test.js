const { strictEqual, deepStrictEqual, ok } = require('assert');

const Postgres = require('../src/controllers/db/strategies/postgres/postgres');
const UserSchema = require('../src/models/postgres/user');
const Context = require('../src/controllers/db/strategies/base/contextStrategy');

let context = {};


const DEFAULT_USER_INIT = { nome: 'Batman', poder: 'Dinheiro' };
let USER_INIT_ID = '';
const UPDATE = {
    nome: 'Minerva',
}

const DEFAULT_USER_UPDATE = { nome: 'Steve', poder: 'Gato' };
let USER_UPDATE_ID = '';

const DEFAULT_USER_INSERT = { nome: 'Cadu', poder: 'Codar' };


describe('PostgreSQL Strategy', function () {
    before(async () => {
        const connection = await Postgres.connect();
        const model = await Postgres.defineModel(connection, UserSchema);
        context = new Context(new Postgres(connection, model));

        //await context.delete();
        const init = await context.create(DEFAULT_USER_INIT);
        USER_INIT_ID = init.dataValues.id;
        await context.create(DEFAULT_USER_UPDATE);
    });

    it('Check PostgreSQL connection', async () => {
        const result = await context.isConnected();
        strictEqual(result, true);
    });

    it('Insert one user', async () => {
        const result = await context.create(DEFAULT_USER_INSERT);
        delete result.dataValues.id;
        deepStrictEqual(result.dataValues, DEFAULT_USER_INSERT);
    });


    it('Select inserted user', async () => {
        let [result] = await context.read(DEFAULT_USER_INSERT);
        delete result.id;
        deepStrictEqual(result, DEFAULT_USER_INSERT);
    });

    it('Delete inserted user', async () => {
        const [item] = await context.read(DEFAULT_USER_INSERT);
        const result = await context.delete(item.id);
        deepStrictEqual(result, 1);
    });

    it('Update one user', async () => {
        const [result] = await context.read(DEFAULT_USER_UPDATE);
        const newItem = {
            ...DEFAULT_USER_UPDATE,
            ...UPDATE
        };
        USER_UPDATE_ID = result.id;
        const [update] = await context.update(result.id, newItem);
        deepStrictEqual(update, 1);
    });

    it('Select updated user', async () => {
        const newItem = {
            ...DEFAULT_USER_UPDATE,
            ...UPDATE
        };
        let [result] = await context.read(newItem);
        delete result.id;
        deepStrictEqual(result, newItem);
    });

    this.afterAll(async () => {

        await context.delete(USER_INIT_ID);
        await context.delete(USER_UPDATE_ID);
    });
});