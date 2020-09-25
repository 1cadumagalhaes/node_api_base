const { strictEqual, deepStrictEqual, ok } = require('assert');

const MongoDB = require('../src/controllers/db/strategies/mongodb/mongodb');
const TeamSchema = require('../src/models/mongodb/teams');
const Context = require('../src/controllers/db/strategies/base/contextStrategy');

const DEFAULT_TEAM_INIT = { nome: 'Liga da justiça', universo: 'DC' };
let TEAM_INIT_ID = '';
const DEFAULT_TEAM_UPDATE = { nome: 'Thundercats', universo: 'Sei lá' };
const UPDATE = {
    universo: 'DC'
};
let TEAM_UPDATE_ID = '';

const DEFAULT_TEAM_INSERT = { nome: 'Vingadores', universo: 'Marvel' };

let context = {};

describe('MongoDB Strategy', function () {
    this.beforeAll(async () => {
        const connection = MongoDB.connect();
        context = new Context(new MongoDB(connection, TeamSchema));

        //await context.delete();
        const init = await context.create(DEFAULT_TEAM_INIT);
        TEAM_INIT_ID = init._id;
        const result = await context.create(DEFAULT_TEAM_UPDATE);
        TEAM_UPDATE_ID = result._id;
    });

    it('Check MongoDB connection', async () => {
        const result = await context.isConnected();
        deepStrictEqual(result, 'Connected');
    });

    it('Insert one team', async () => {
        const { nome, universo } = await context.create(DEFAULT_TEAM_INSERT);
        deepStrictEqual({ nome, universo }, DEFAULT_TEAM_INSERT);
    });

    it('Select inserted team', async () => {
        const [{ nome, universo }] = await context.read(DEFAULT_TEAM_INSERT);
        deepStrictEqual({ nome, universo }, DEFAULT_TEAM_INSERT);
    });

    it('Delete inserted team', async () => {
        const [item] = await context.read(DEFAULT_TEAM_INSERT);
        const result = await context.delete(item._id);
        deepStrictEqual(result.ok, 1);
    });
    it('Update one team', async () => {
        const result = await context.update(TEAM_UPDATE_ID, UPDATE);
        deepStrictEqual(result.nModified, 1);
    });
    it('Select updated team', async () => {
        const newItem = {
            ...DEFAULT_TEAM_UPDATE,
            ...UPDATE
        }
        const [{ nome, universo }] = await context.read({
            ...DEFAULT_TEAM_UPDATE,
            ...UPDATE
        });

        deepStrictEqual({ nome, universo }, newItem);
    })

    this.afterAll(async () => {
        await context.delete(TEAM_INIT_ID);
        await context.delete(TEAM_UPDATE_ID);
    })
});