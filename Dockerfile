FROM node:7.2

# Install PM 2 apidoc yarn
RUN npm install -g pm2 apidoc yarn

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app
RUN npm install

# Bundle app source
COPY . /usr/src/app/

# set your port
ENV PORT 8888

EXPOSE 8888
CMD ["npm", "start"]
