# base image
FROM node:10

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json ./package.json

RUN npm cache clean --force
RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent
COPY . .

EXPOSE 3000
# start app
CMD ["npm", "start"]

