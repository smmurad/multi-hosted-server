#!/bin/bash

# Define the project directory
PROJECT_DIR="/opt/repos/multi-hosted-server"
# SUPERVISOR_SERVICE_NAMES=("frontend_server" "backend_server")
SUPERVISOR_SERVICE_NAMES=("backend_server")
# Navigate to the project directory
cd $PROJECT_DIR || exit

# Fetch the latest changes from the remote repository
git fetch origin

# Check if there are updates
if git diff --quiet HEAD origin/main; then
    echo "No updates found."
else
    echo "Updates found. Pulling changes and rebuilding the project."

    # Pull the latest changes
    git pull origin main

    # Rebuild the project (customize this step according to your project's build process)
    # For example, you might use:
    # make
    # npm install
    # ./build.sh
    # mvn clean install
    # etc.
    # Example:
    # scripts/build.sh

    # Restart the project using Supervisor
    for service in "${SUPERVISOR_SERVICE_NAMES[@]}"
    do
        supervisorctl restart "$service"
        echo "Restarted $service"
    done
fi
