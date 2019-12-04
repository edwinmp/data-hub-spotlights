FROM node:10

WORKDIR /usr/src/app

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && yes |apt-get install yarn

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
