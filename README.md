# Compactly - OSS URL Shortener

`compactly` is an Open-Source URL Shortener that utilizes microservices, distributed transactions, containerization, message brokers, and caching within a monorepo.

## Built with

- Backend: Node, Express, TypeScript, Apache Kafka, Redis, MongoDB
- Dev/Infra: Microservices, Docker, Turborepo

## What's inside?

### Applications

- `apps/api`: the NodeJS server that exposes an API that serves redirects for shortened URLs or allows users to create new shortened urls for a targetURL by picking up pre-generated slugs from the slug pool.
- `apps/pool-manager`: a NodeJS microservice that takes care of refilling the pool with available slugs for short urls. It consumes Kafka messages which are published by the `apps/api` to know when to do so.
- `apps/analytics`: a NodeJS microservice that consumes Kafka Messages published by the `apps/api` and handles the analytics updates to the database.

### Packages

Shared Configs/Packages between the apps.

- `packages/shared` - shared models, schemas, constants, and utility files that are reused between applications.
- `packages/tooling` - shared dev tooling and dev tooling configuration.

## Prerequisites

- **Node > v22**
- **Docker**
  The microservices within the Monorepo are containerized. Commands are exposed that allow you to run them without Docker, but you'll also have to setup your own Kafka/MongoDB instances.
  [Docker Desktop - docker.com](https://www.docker.com/products/docker-desktop/)

## Docker Compose setups

- **docker-compose.dev.yaml**
  The Docker Compose setup for development.
  Runs all microservices in development mode with HMR and also runs the shared services - MongoDB, Redis, Kafka.
- **docker-compose.yaml**
  The Docker Compose setup for production.
  Compiles all microservices and runs them with the production environment inside a Docker Container. Also - doesn't run any shared services because they supposedly live in the Cloud or on a VPS at this point.

## Running the Applications

Use the `.env.sample` file and create `.env` files in the specific application folders.

```
npm run dev
```

Alternatively if you don't want to run with Docker for some reason - install the dependencies and use turbo's dev command. Reminder - you'll have to configure and run the shared services on your local machine (MongoDB, Kafka, Redis, ...etc)

```
npm install && npm run turbo:dev
```

## Building the Applications / Running in production mode

The _build_ command compiles all microservices and runs them with their production environment configuration inside a Docker Container.

```
npm run build
```

... or you can just build the apps with Turborepo and then run them all together or individually if that's what you need.

```
npm install && npm run turbo:build
```

## Turborepo Documentation

You can run or build individual microservices by themselves by adjusting the build/run commands.

To learn more about how to do that - please refer to [Turborepo Docs](https://turborepo.com/docs).
