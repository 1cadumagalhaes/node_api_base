# Instalação dos containers de docker

## Instalando Postgres com docker

```shell

docker run \
    --name postgres \
    -e POSTGRES_USER=1cadumagalhaes \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=users \
    -p 5432:5432 \
    -d \
    postgres

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

```

```shell

docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhadoadmin \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb \
    mongo --host localhost \
    -u admin \
    -p senhadoadmin \
    --authenticationDatabase admin \
    --eval "db.getSiblingDB('teams').createUser({user: '1cadumagalhaes', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'teams'}]})"
```
