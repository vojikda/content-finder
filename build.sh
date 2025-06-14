#!/bin/sh

# Create dist directory if it doesn't exist
mkdir -p dist

# Verify TypeScript config files exist
if [ ! -f tsconfig.json ] || [ ! -f tsconfig.server.json ]; then
    echo "Error: TypeScript configuration files are missing"
    exit 1
fi

# Clean and build
npm run clean
npm run build:server

# Verify build output
if [ ! -f dist/server/index.js ]; then
    echo "Error: Build output is missing"
    exit 1
fi

echo "Build completed successfully" 