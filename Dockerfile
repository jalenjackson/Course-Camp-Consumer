FROM node:9.4.0-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

WORKDIR /usr/app

COPY package*.json ./
USER root
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
