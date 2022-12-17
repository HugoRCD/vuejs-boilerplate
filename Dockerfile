FROM node:lts-alpine
WORKDIR /usr/src/app
COPY . ./
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "serve"]