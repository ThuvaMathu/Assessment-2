FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . /app
CMD node index.js
