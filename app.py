from flask import Flask
import os

app = Flask(__name__)

# Get the instance name from environment variables
instance_name = os.getenv('INSTANCE_NAME', 'DefaultInstance')

@app.route('/')
def hello_world():
    cow_art = """
    <pre>
     \\   ^__^
      \\  (oo)\\_______
         (__)\\       )\\/\\
             ||----w |
             ||     ||
    </pre>
    """
    return f'<h1>Hello {instance_name}!</h1>{cow_art}'

if __name__ == '__main__':
    print("Starting server...")
    port = int(os.getenv('PORT', 5000))  # Default port is 5000 if not set
    app.run(host='0.0.0.0', port=port)

