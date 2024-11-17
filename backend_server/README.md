# Flask Multi-Instance Application

This project is a Flask application designed to run multiple instances with different configurations.

## Setup

1. Create and activate a Python virtual environment:
   ```
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install Flask:
   ```
   pip install flask
   ```

## Running the Application

The recommended way to run the instances is using Supervisor: `supervisorctl start my_flask_app`


The Supervisor configuration for `my_flask_app` is defined in: `/etc/supervisor/conf.d/backend_server.conf`


## Nginx Reverse Proxy
HTTP requests are reverse proxied by Nginx. The configuration for this setup is located at: `/etc/nginx/sites-available/my_flask_app`

## Manual Configuration

Set the following environment variables before running the application:

- `INSTANCE_NAME`: Name of the instance (default: "DefaultInstance")
- `PORT`: Port number for the instance to run on (default: 5001)

Example:
export INSTANCE_NAME="Instance1"
export PORT=5001

You can then run the app manually, using `python3 app.py`
