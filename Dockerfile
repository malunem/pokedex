# Use a Node.js base image
FROM node:18.14.2

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

# Start Gatsby development server
CMD ["npm", "run", "develop"]
