# Use Node 18 as base
FROM node:18

# Install Java, Python, C++, and pip
RUN apt-get update && apt-get install -y \
  openjdk-17-jdk \
  g++ \
  python3 \
  python3-pip

# Set working directory
WORKDIR /app

# Copy all backend files
COPY . .

# Install node dependencies
RUN npm install

# Expose backend port
EXPOSE 5000

# Start server
CMD ["node", "index.js"]
