#!/bin/bash

# Exit on error
set -e

# Define directories
REACT_DIR="./path-to-your-react-app"
BUILD_DIR="$REACT_DIR/build"

# Navigate to React directory
cd $REACT_DIR

# Install React dependencies
echo "Installing React dependencies..."
npm install

# Build the React app
echo "Building React app..."
npm run build

# Ensure build directory exists
if [ ! -d "$BUILD_DIR" ]; then
  echo "Build directory not found. Make sure the build step was successful."
  exit 1
fi

# Copy build files to Flask static folder (adjust path as needed)
FLASK_STATIC_DIR="./path-to-your-flask-app/static"
echo "Copying build files to Flask static directory..."
cp -r $BUILD_DIR/* $FLASK_STATIC_DIR/

echo "React app successfully built and copied to Flask static directory."
