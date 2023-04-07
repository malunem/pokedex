# Use a Node.js base image
FROM node:18.14.2
RUN npm install --global gatsby-cli

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 0000:8000

# Start Gatsby development server
CMD ["npm", "run", "develop"]
