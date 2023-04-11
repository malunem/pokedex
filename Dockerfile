# Use a Node.js base image
FROM node:18.14.2 as base
WORKDIR /pokedex

# Install Volta
RUN apt update && apt -y upgrade
RUN apt-get install curl
SHELL ["/bin/bash", "-c"]
ENV BASH_ENV ~/.bashrc
ENV VOLTA_HOME /root/.volta
ENV PATH $VOLTA_HOME/bin:$PATH
RUN curl -v -f https://get.volta.sh | bash

# Install dependencies
COPY package*.json .
COPY yarn.lock .
RUN volta install node
RUN yarn global add gatsby-cli

# Copy source code
COPY . .

EXPOSE 8000

FROM base as dev
CMD yarn install && yarn run develop

FROM base as prod
CMD yarn install && yarn run prod

FROM base as test
CMD yarn install && yarn run test