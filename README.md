# Open-Source URL-Shortener

`url-shortener` is a a URL shortener that utilizes microservices, containerization, message brokers, and caching within a monorepo.

## Built with

- Backend: Node, Express, TypeScript, Apache Kafka, Redis, MongoDB
- Dev/Infra: Microservices, Docker, Turborepo

## What's inside?

### Applications

- `apps/api`: the NodeJS server that exposes an API that covers the business requirements for a functional URL Shortener
- `apps/pool-manager`: a NodeJS microservice that takes care of refilling the pool with available slugs for short urls. It consumes Kafka messages which are published by the `apps/api` to know when to do so .
- `apps/analytics`: a NodeJS microservice that consumes Kafka Messages published by the `apps/api` and handles the analytics updates to the database.

### Packages

Shared Configs/Packages between the apps.

- `/packages/models` - shared models & schemas between the main server and microservices.
- `packages/eslint-config` - shared eslint config for all JavaScript/TypeScript applications & packages.
- `packages/typescript-config` - shared eslint config for all TypeScript applications & packages.
- `packages/prettier-config` - shared eslint config for all projects.

## Docker Compose setups

For a more convenient Developer Experience, a _docker-compose_ file (docker-compose.services.yaml) is included that spins up the shared services between the applications so you don't need to install or run them locally.

The applications are containerized and naturally - the production _docker-compose_ file (docker-compose.yaml) doesn't include the shared services. Supposedly you have them running in the cloud or on a VPS at this point.

The docker images for apps are build using Turbo's built in `prune` method that provides us a stripped-down monorepo that only contains the relevant to the specific application files and package.json / package-lock.json. This ensures that installing new dependencies in different apps/packages won't result in different hashes for all application images.

## Running the Applications

Use the `.env.sample` file and create `.env` files in the specific application folders.

Then run the docker container for the shared services if you don't have those (Mongo/Apache Kafka) installed and configured locally.

```
npm run compose:services
```

After that - to run all apps and packages, run the following command:

```
npm run dev
```

## Building the Applications / Running in production mode

Use the included in `package.json` command that builds all the applications and creates Docker Images with them which are bundled in a single Docker Container that effectively runs the whole application in production mode.

The build steps are documented in a `.Dockerfile` on an /app level basis.

```
npm run compose:app
```

... or you can just build the apps with Turborepo and then run them all together or individually if that's what you need.

```
npm run build
```

## Turborepo Documentation

You can run or build individual microservices by themselves by adjusting the build/run commands.

To learn more about how to do that - please refer to [Turborepo Docs](https://turborepo.com/docs).
