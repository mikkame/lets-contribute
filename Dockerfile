FROM node:14.3-alpine

ENV PROJECT_ROOTDIR /app/

WORKDIR ${PROJECT_ROOTDIR}

COPY package.json yarn.lock ${PROJECT_ROOTDIR}

RUN yarn install &&\
    yarn global add @vue/cli

COPY . ${PROJECT_ROOTDIR}

EXPOSE 8080

CMD ["/bin/sh", "-c", "yarn serve"]
