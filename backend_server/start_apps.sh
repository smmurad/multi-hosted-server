#!/bin/bash

# Name of the Python script you want to run
APP_SCRIPT="app.py"

# Log file where output and errors will be written
LOG_FILE="app.log"

# Define exports for instance 1 
export INSTANCE_NAME="Instance 1"
export PORT=5001

# Command to run the Python script in the background with nohup, appending to the log file
nohup python3 $APP_SCRIPT >> $LOG_FILE 2>&1 &

# Define exports for instance 2 
export INSTANCE_NAME="Instance 2"
export PORT=5002

# Command to run the Python script in the background with nohup, appending to the log file
nohup python3 $APP_SCRIPT >> $LOG_FILE 2>&1 &

# Notify the user that the application has started
echo "$APP_SCRIPT is running in the background. Output is being appended to $LOG_FILE."
