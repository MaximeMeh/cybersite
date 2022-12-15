FROM node

WORKDIR /accounts

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "accounts"]