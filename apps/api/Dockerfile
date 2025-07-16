FROM node:22.16.0

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the api package.json
COPY apps/api/package.json ./apps/api/package.json

RUN npm install

# Copy compiled code
COPY apps/api/dist ./apps/api/dist

CMD [ "node", "apps/api/dist/app.js" ]