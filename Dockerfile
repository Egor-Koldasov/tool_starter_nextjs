#https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY package.json package.json
RUN true
COPY package-lock.json package-lock.json
RUN true
COPY tsconfig.json tsconfig.json

CMD [ "npm", "run", "dev" ]
