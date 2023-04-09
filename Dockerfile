# Use a Node.js base image
FROM node:18.14.2
WORKDIR /pokedex
COPY package*.json .
# Setup Gatsby environment
RUN apt update && \
  apt -y upgrade && \ 
  apt-get install curl
# Install and load nvm
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && \
# export NVM_DIR="$HOME/.nvm" && \
# [ -s "$NVM_DIR/nvm.sh" ] && \
# . "$NVM_DIR/nvm.sh" && \  
# [ -s "$NVM_DIR/bash_completion" ] && \
# . "$NVM_DIR/bash_completion" && \
# nvm install 18 && \
# nvm use 18 && \

SHELL ["/bin/bash", "-c"]
ENV BASH_ENV ~/.bashrc
ENV VOLTA_HOME /root/.volta
ENV PATH $VOLTA_HOME/bin:$PATH
RUN curl -v -f https://get.volta.sh | bash
RUN volta install node && \
  volta run npm install -g gatsby-cli && \
  volta run npm install 

COPY . .
COPY .git .git

EXPOSE 8000

CMD volta run npm run develop