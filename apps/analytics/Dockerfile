FROM node:22.16.0-alpine as base

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the application package.json
COPY apps/analytics/package.json ./apps/analytics/package.json

# Install dependencies
RUN npm install

# Copy the app
COPY apps/analytics ./apps/analytics
# Copy the shared packages
COPY packages ./packages

WORKDIR /usr/src/app/apps/analytics

RUN npx tsc && npx tsc-alias

CMD [ "node", "dist/app.js" ]