# Open-Source URL-Shortener

An Open-Source URL-Shortener that utilizes a microservices architecture within a Monorepo.

## Built with

- Backend: Node, Express, TypeScript, Apache Kafka, Redis, MongoDB
- Dev/Infra: Microservices, Docker, Turborepo

## What's inside?

- `apps/analytics`: a NodeJS microservice that consumes Kafka Messages and handles the analytics updates to the database
- `apps/api`: the NodeJS server that exposes an API that covers the business requirements for a functional URL Shortener
- `/packages` - shared config/packages between the apps.

## Docker Compose setups

For a more convenient Developer Experience, a _docker-compose_ file (docker-compose.services.yaml) is included that spins up the shared services between the applications so you don't need to install or run them locally.

The applications are containerized and naturally - the production _docker-compose_ file (docker-compose.yaml) doesn't include the shared services. Supposedly you have them running in the cloud or on a VPS at this point.

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
