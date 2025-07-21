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

# --------- BUILDER stage
FROM base AS builder
# copy pruned app source and node_modules from the prepare stage
COPY --from=prepare /usr/src/app/out/full ./
COPY --from=prepare /usr/src/app/node_modules ./node_modules
# build the app
RUN npm run turbo:build

# --------- RUNNER stage
FROM base AS runner
COPY --from=builder /usr/src/app .
# run the app
CMD [ "node", "apps/api/dist/app.js" ]

# --------- DEVELOPMENT stage
FROM base AS dev
# copy pruned app source and node_modules from the prepare stage
COPY --from=prepare /usr/src/app/out/full ./
COPY --from=prepare /usr/src/app/node_modules ./node_modules
# run in development mode with hot reload
CMD ["npx", "tsx", "watch", "./apps/api/src/app.ts"]