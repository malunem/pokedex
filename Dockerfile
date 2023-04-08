# Use a Node.js base image
FROM node:18.14.2
WORKDIR /
COPY package*.json .
# Setup Gatsby environment
RUN apt update && \
  apt -y upgrade && \ 
  apt-get install curl && \
  # Install and load nvm
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && \
  export NVM_DIR="$HOME/.nvm" && \
  [ -s "$NVM_DIR/nvm.sh" ] && \
  . "$NVM_DIR/nvm.sh" && \  
  [ -s "$NVM_DIR/bash_completion" ] && \
  . "$NVM_DIR/bash_completion" && \
  nvm install 18 && \
  nvm use 18 && \
  npm install -g gatsby gatsby-cli && \
  npm install 

COPY . .

EXPOSE 8000

CMD  npx gatsby develop -H 0.0.0.0