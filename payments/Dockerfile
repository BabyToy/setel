FROM node:alpine as builder
# FROM node/15.5-alpine as builder
RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
COPY . .

RUN yarn global add typescript @nestjs/cli
RUN yarn install

RUN nest build

FROM mhart/alpine-node
RUN apk add --update sqlite && rm -rf /var/cache/apk/*
# RUN apk add --update wget && rm -rf /var/cache/apk/
RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
RUN mkdir -p database
COPY --from=builder /usr/local/app ./
RUN /usr/bin/sqlite3
EXPOSE 4000/TCP
CMD ["yarn", "run", "start:prod"]
