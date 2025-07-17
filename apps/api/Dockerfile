FROM node:22.16.0-alpine as base

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the application package.json
COPY apps/api/package.json ./apps/api/package.json

# Install dependencies
RUN npm install

# Copy the app
COPY apps/api ./apps/api
# Copy the shared packages
COPY packages ./packages

WORKDIR /usr/src/app/apps/api

RUN npx tsc && npx tsc-alias

CMD [ "node", "dist/app.js" ]