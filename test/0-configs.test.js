const { strictEqual, deepStrictEqual, ok } = require('assert');

require('dotenv').config();

const EXPECTED = {
    POSTGRES: {
        USER: '1cadumagalhaes',
        PASSWORD: 'minhasenhasecreta',
        DB: 'users',
        TABLE: 'USERS_TABLE'
    },
    MONGODB: {
        USER: '1cadumagalhaes',
        PASSWORD: 'minhasenhasecreta',
        DB: 'teams',
    }
}
describe('Validando configurações', function () {
    let env;
    before(() => {
        env = process.env;
    })

    it('Need to find environmental variables', () => {
        ok(Object.keys(env).length > 0);
    });

    /*------------------- POSTGRES -----------------------*/
    it('Should find POSTGRES_ variables', () => {
        const {
            POSTGRES_USER,
            POSTGRES_PASSWORD,
            POSTGRES_DB,
            POSTGRES_TABLE
        } = env;

        ok(typeof POSTGRES_USER === 'string');
        ok(typeof POSTGRES_PASSWORD === 'string');
        ok(typeof POSTGRES_DB === 'string');
        ok(typeof POSTGRES_TABLE === 'string');
    });

    it('Should match POSTGRES_ variables', () => {
        const {
            POSTGRES_USER,
            POSTGRES_PASSWORD,
            POSTGRES_DB,
            POSTGRES_TABLE
        } = env;
        deepStrictEqual(POSTGRES_USER, EXPECTED.POSTGRES.USER);
        deepStrictEqual(POSTGRES_PASSWORD, EXPECTED.POSTGRES.PASSWORD);
        deepStrictEqual(POSTGRES_DB, EXPECTED.POSTGRES.DB);
        deepStrictEqual(POSTGRES_TABLE, EXPECTED.POSTGRES.TABLE);
    });


    /*------------------- MONGODB -----------------------*/
    it('Should find MONGODB variables', () => {
        const {
            MONGODB_USER,
            MONGODB_PASSWORD,
            MONGODB_HOST,
            MONGODB_PORT,
            MONGODB_DB,
        } = env;

        ok(typeof MONGODB_USER === 'string');
        ok(typeof MONGODB_PASSWORD === 'string');
        ok(typeof MONGODB_DB === 'string');
    });

    it('Should match MONGODB variables', () => {
        const {
            MONGODB_USER,
            MONGODB_PASSWORD,
            MONGODB_HOST,
            MONGODB_PORT,
            MONGODB_DB,
        } = env;
        deepStrictEqual(MONGODB_USER, EXPECTED.MONGODB.USER);
        deepStrictEqual(MONGODB_PASSWORD, EXPECTED.MONGODB.PASSWORD);
        deepStrictEqual(MONGODB_DB, EXPECTED.MONGODB.DB);
    });
})