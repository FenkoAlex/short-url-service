## Description

Service create short URL

## Project setup

```bash
$ yarn install
$ docker pull postgres:15
$ docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
$ npx drizzle-kit migrate                                                                                     
```

## Compile and run the project

```bash
# watch mode
$ yarn run start:dev
```

## Run tests

```bash
# unit tests
$ yarn run test

