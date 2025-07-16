FROM node:22.16.0

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the api package.json
COPY apps/analytics/package.json ./apps/analytics/package.json

RUN npm install

# Copy compiled code
COPY apps/analytics/dist ./apps/analytics/dist

CMD [ "node", "apps/analytics/dist/app.js" ]