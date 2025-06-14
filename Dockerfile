FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the server
RUN npm run build:server

# Expose the port
EXPOSE 3001

# Start the server
CMD ["npm", "run", "server:prod"] 