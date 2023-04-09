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
RUN volta install node
RUN volta run npm install -g gatsby-cli
RUN volta run npm ci 

# Copy source code
COPY . .

EXPOSE 8000

FROM base as dev
CMD volta run npm run develop

FROM base as prod
CMD volta run npm run prod

FROM base as test
CMD volta run npm run test