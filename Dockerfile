FROM node:10

WORKDIR /usr/src/app

RUN npm install -g yarn

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
