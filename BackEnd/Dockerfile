# Use Node base image
FROM node:18

# Install Java, C++, Python
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk g++ python3 python3-pip && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy backend files
COPY . .

# Install Node.js dependencies
RUN npm install

# Set environment variable to avoid node warnings in some services
ENV NODE_ENV=production

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["node", "index.js"]
