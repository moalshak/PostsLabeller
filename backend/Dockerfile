# Use the official Node.js 20.10.0 image from Docker Hub
FROM node:20.10.0-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
# If you need to install all dependencies including devDependencies (for building, testing etc.)
RUN npm install

# Bundle app source
COPY . .

# Build your application if it needs a compilation step (e.g., TypeScript to JavaScript)
RUN npm run build

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "dist/main"]