#!/bin/sh

set -e  # Exit on error

echo "Starting build process..."

# Create dist directory if it doesn't exist
echo "Creating dist directory..."
mkdir -p dist

# Verify TypeScript config files exist
echo "Verifying TypeScript configuration files..."
if [ ! -f tsconfig.json ] || [ ! -f tsconfig.server.json ]; then
    echo "Error: TypeScript configuration files are missing"
    exit 1
fi

# Verify source files exist
echo "Verifying source files..."
if [ ! -d src/server ]; then
    echo "Error: Server source directory is missing"
    exit 1
fi

# List source files
echo "Source files found:"
find src/server -type f -name "*.ts" -o -name "*.tsx"

# Clean and build
echo "Cleaning previous build..."
npm run clean

echo "Building server..."
npm run build:server

# Verify build output
echo "Verifying build output..."
if [ ! -f dist/server/index.js ]; then
    echo "Error: Build output is missing"
    exit 1
fi

echo "Build completed successfully" 