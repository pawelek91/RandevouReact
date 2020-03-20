# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm uninstall -g jest
RUN npm install -g jest
RUN npm cache clean --force
RUN npm install

RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent

# start app
CMD ["npm", "start"]

