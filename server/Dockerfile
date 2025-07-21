FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the app
COPY . .

# Expose your app's port
EXPOSE 8383

# Start the app
CMD ["npm", "run", "dev"]
