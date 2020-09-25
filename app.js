const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Pack = require('./package');

const Context = require('./src/controllers/db/strategies/base/contextStrategy');
const MongoDB = require('./src/controllers/db/strategies/mongodb/mongodb');
const Postgres = require('./src/controllers/db/strategies/postgres/postgres');

const UserSchema = require('./src/models/postgres/user');
const TeamsSchema = require('./src/models/mongodb/teams');
const UsersRoutes = require('./src/routes/usersRoutes');


const swaggerOptions = {
    info: {
        title: 'API with HapiJS',
        version: Pack.version,
        contact: {
            name: 'Carlos Magalhães'
        }
    }
}


const mapRoutes = (instance, methods) => methods.map(method => instance[method]());

async function server() {

    const postgres_connection = await Postgres.connect();
    const model = await Postgres.defineModel(postgres_connection, UserSchema);


    const postgres = new Context(new Postgres(postgres_connection, model));
    const app = new Hapi.Server({
        port: 4000,
        host: 'localhost'
    });

    await app.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    let routes = [
        {
            path: '/',
            method: 'GET',
            options: {
                tags: ['api'],
                description: 'Base path of the api to see if the server is running',
                notes: 'Returns a static message'
            },
            handler: function (request, headers) {
                return 'Servidor rodando com sucesso!';
            },
        },
        ...mapRoutes(new UsersRoutes(postgres), UsersRoutes.methods())
    ];

    app.route(routes);

    try {
        await app.start();
        console.info('Server running at', app.info.port);
    } catch (error) {
        console.error(error);
    }
    return app;
}

module.exports = server();