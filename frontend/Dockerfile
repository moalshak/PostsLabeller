# Use an official Node runtime as a parent image
FROM node:20.10.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# COPY yarn.lock ./ (uncomment this line if you use Yarn)

# Install dependencies
RUN npm install
# RUN yarn install (uncomment this line if you use Yarn)

# Copy the rest of the application
COPY . .

RUN sh create-env-file.sh REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
RUN cat .env

# Build the application
RUN npm run build

# Install 'serve' to serve the application on container startup
RUN npm install -g serve

# The port that your container will listen on
EXPOSE 3000

# Command to run the app using 'serve'
CMD ["serve", "-s", "build", "-l", "3000"]
