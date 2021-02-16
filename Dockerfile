FROM node:15.8.0 as builder
WORKDIR /usr/src/app
COPY . /usr/src/app
ENTRYPOINT ["./docker-entrypoint.sh"]

FROM builder as dev
RUN ["yarn", "install"]
CMD [ "yarn", "run", "start:dev" ]
EXPOSE 3000

FROM builder as prod
RUN ["yarn", "install", "--production"]
CMD [ "yarn", "run", "start:prod" ]
EXPOSE 3000

