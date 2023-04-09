# Use a Node.js base image
FROM node:18.14.2
WORKDIR /pokedex
COPY package*.json .
# Setup Gatsby environment
RUN apt update && \
  apt -y upgrade && \ 
  apt-get install curl

SHELL ["/bin/bash", "-c"]
ENV BASH_ENV ~/.bashrc
ENV VOLTA_HOME /root/.volta
ENV PATH $VOLTA_HOME/bin:$PATH
RUN curl -v -f https://get.volta.sh | bash
RUN volta install node && \
  volta run npm install -g gatsby-cli && \
  volta run npm install 

COPY . .

EXPOSE 8000

CMD volta run npm run develop