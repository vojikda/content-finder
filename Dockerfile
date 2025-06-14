FROM node:18-alpine

WORKDIR /app

# Copy package files and TypeScript configs first
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src/ src/
COPY build.sh ./

# Make build script executable
RUN chmod +x build.sh

# Verify file structure
RUN ls -la && \
    echo "Source files:" && \
    find src -type f

# Build the server
RUN ./build.sh

# Expose the port
EXPOSE 3001

# Start the server
CMD ["npm", "run", "server:prod"] 