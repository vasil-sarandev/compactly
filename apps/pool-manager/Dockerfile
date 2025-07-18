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
RUN turbo prune @apps/pool-manager --docker

# --------- BUILDER stage
FROM base AS builder
# Copy only JSON files needed for installing deps
COPY --from=prepare /usr/src/app/out/json/ .
# install the dependencies
RUN npm install
# copy app source from the prepare stage
COPY --from=prepare /usr/src/app/out/full .
# build the app
RUN npm run build

# --------- RUNNER stage
FROM base AS runner
COPY --from=builder /usr/src/app .
# run the app
CMD [ "node", "apps/pool-manager/dist/app.js" ]