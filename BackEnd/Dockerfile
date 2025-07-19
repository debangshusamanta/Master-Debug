# Use a Node.js image as base
FROM node:18

# Install Java (OpenJDK 17)
RUN apt update && apt install -y openjdk-17-jdk

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of your code
COPY . .

# Expose the backend port (optional, Render handles this)
EXPOSE 5000

# Start your backend
CMD ["npm", "start"]
