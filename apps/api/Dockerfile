FROM node:22.16.0-alpine AS base
# set working directory
WORKDIR /usr/src/app

# --------- PREPARE stage
FROM base AS prepare
# install turbo
RUN npm install -g turbo@2
# copy the whole monorepo
COPY . .
# run turbo prune and only leave the relevant files inside. This creates an /out folder with the correct package.json(s)
RUN turbo prune @apps/api --docker
# install the dependencies
RUN npm install

# --------- DEVELOPMENT stage
FROM base AS dev
# copy pruned app source and node_modules from the prepare stage
COPY --from=prepare /usr/src/app/out/full ./
COPY --from=prepare /usr/src/app/node_modules ./node_modules
# set working directory to app
WORKDIR /usr/src/app/apps/api
# copy the env file
COPY /apps/api/.env.local .
# run in development mode with hot reload
CMD ["npx", "tsx", "watch", "--env-file=.env.local", "./src/app.ts"]

# --------- PROD stage
FROM base AS prod
# copy pruned app source and node_modules from the prepare stage
COPY --from=prepare /usr/src/app/out/full ./
COPY --from=prepare /usr/src/app/node_modules ./node_modules
# compile the app
RUN npm run turbo:build
# set working directory to app
WORKDIR /usr/src/app/apps/api
# copy the env file
COPY /apps/api/.env .
# run the compiled app
CMD [ "node", "--env-file=.env", "dist/apps/api/src/app.js" ]