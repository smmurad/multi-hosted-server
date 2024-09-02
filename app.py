from flask import Flask
import os

app = Flask(__name__)

# Get the instance name from environment variables
instance_name = os.getenv('INSTANCE_NAME', 'DefaultInstance')

@app.route('/')
def hello_world():
    return f'Hello. {instance_name}!'

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))  # Default port is 5000 if not set
    app.run(host='0.0.0.0', port=port)

