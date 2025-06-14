FROM node:18-alpine

WORKDIR /app

# Copy package files and TypeScript configs
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy source code and build script
COPY . .

# Make build script executable
RUN chmod +x build.sh

# Build the server
RUN ./build.sh

# Expose the port
EXPOSE 3001

# Start the server
CMD ["npm", "run", "server:prod"] 