from flask import Flask, jsonify, render_template
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.static_folder = 'static'

# Get the instance name from environment variables
instance_name = os.getenv('INSTANCE_NAME', 'DefaultInstance')

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('test.html')

# Define an example route for your API
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'message': 'Hello from Flask!'})

if __name__ == '__main__':
    print("Starting server...")
    port = int(os.getenv('PORT', 5001))  # Default port is 5001 if not set
    app.run(host='0.0.0.0', port=port)

