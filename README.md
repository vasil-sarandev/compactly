# Compactly - OSS URL Shortener

`compactly` is an Open-Source URL Shortener that utilizes microservices, containerization, message brokers, and caching within a monorepo.

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

- `packages/models` - shared models & schemas between the main server and microservices.
- `packages/util` - shared utility methods and config constants between the main server and microservices.
- `packages/eslint-config` - shared eslint config for all JavaScript/TypeScript applications & packages.
- `packages/typescript-config` - shared eslint config for all TypeScript applications & packages.
- `packages/prettier-config` - shared eslint config for all projects.

## Application Flow

### Shortened URL Creation

1. User / API request to create a Shortened URL occurrs.
2. The `@apps/api` checks the available count in the slug pool.
   - If there's any available, it runs a transaction that picks up a pregenerated slug from the pool and decreases _availableCount_ during the shortenedUrl creation.
   - If the available count is under than the thresh hold for the minimum desired slugs in pool, `@apps/api` publishes a kafka message to the topic that `@apps/pool-manager` is subscribed to. When the `@apps/pool-manager` picks up this message, it generates a number of slugs that it makes sure don't exist in the current slug pool and in the shortenedUrl collection. It then runs a transaction that adds them to the slug pool and increases the _availableCount_.
   - If there's 0 slugs available, it runs the disaster scenario - `@apps/api` generates a slug recursively until it finds one that doesn't exist in the collection and assigns it to the shortenedUrl.

### Shortened URL redirects

[TODO]

## Prerequisites

The default run/build commands for the monorepo use containers.

Commands are also exposed that run/build the monorepo without Docker, but you'd have a much easier time running all the applications and shared services by making sure you have Docker installed.

The development Docker compose file also runs images for the shared services like Kafka & Mongo, so you don't have to install/configure these on your machine.

[Docker Desktop - docker.com](https://www.docker.com/products/docker-desktop/)

## Docker Compose setups

For a more convenient Developer Experience, a _docker-compose_ file (docker-compose.dev.yaml) is included that spins up the shared services between the applications so you don't need to install or run them locally.

The applications are containerized and naturally - the production _docker-compose_ file (docker-compose.yaml) doesn't include the shared services. Supposedly you have them running in the cloud or on a VPS at this point.

The docker images for apps are build using Turbo's built in `prune` method that provides us a stripped-down monorepo that only contains the relevant to the specific application files and package.json / package-lock.json. This ensures that installing new dependencies in different apps/packages won't result in different hashes for all application images.

## Running the Applications

Use the `.env.sample` file and create `.env` files in the specific application folders.

Then run the `dev` command that uses Docker and the `./docker-compose.dev.yaml` config. It spins up the shared services between the apps and runs the DEVELOPMENT mode containerized apps with HMR enabled.

```
npm run dev
```

Alternatively if you don't want to run with Docker for some reason - install the dependencies and use turbo's dev command. Reminder - you'll have to configure and run the shared services on your local machine (MongoDB, Kafka, Redis, ...etc)

```
npm install && npm run turbo:dev
```

## Building the Applications / Running in production mode

Use the included in `package.json` command that builds all the applications and creates Docker Images with them which are bundled in a single Docker Container that effectively runs the whole application in production mode.

The build steps are documented in a `.Dockerfile` on an /app level basis.

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
