from flask import Flask
import os

app = Flask(__name__)

app.static_folder = 'static'

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
    image_html = '<img src="/static/images/sigurd_er_best.png" alt="Sig the chief">'
    return f'<h1>Hei Leon!!!</h1>{cow_art}{image_html}'

@app.route('/test')
def test():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Page</title>
    </head>
    <body>
        <h1>Test Page</h1>
        <p>This is a test page for the Flask application.</p>
        <p>Instance Name: {}</p>
    </body>
    </html>
    """.format(instance_name)

if __name__ == '__main__':
    print("Starting server...")
    port = int(os.getenv('PORT', 5001))  # Default port is 5000 if not set
    app.run(host='0.0.0.0', port=port)

