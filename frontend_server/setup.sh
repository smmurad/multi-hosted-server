#!/bin/bash

# Exit on error
set -e

# Install React dependencies
echo "Installing React dependencies..."
npm install

# Build the React app
echo "Building React app..."
npm run build

echo "React app successfully built."

# Serving the React app
echo "Serving the React app on port 3003"
serve -s build -l 3003

echo "React app successfully served."