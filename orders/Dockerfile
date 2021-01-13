FROM node
RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
COPY . .

RUN yarn global add typescript @nestjs/cli
RUN yarn install

RUN nest build
RUN mkdir -p database
EXPOSE 3000

CMD yarn run start:prod
