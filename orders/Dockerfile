FROM node:alpine as builder
# FROM node/15.5-alpine as builder
RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
COPY . .

RUN yarn global add typescript @nestjs/cli
RUN yarn install

RUN nest build

FROM mhart/alpine-node:latest
RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
COPY --from=builder /usr/local/app ./
EXPOSE 3000
CMD ["yarn", "run", "start:prod"]
