from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

# Import for image processing
from PIL import Image
import pytesseract
import numpy as np

app = Flask(__name__, static_folder="static/build")
# CORS(
#     app,
#     resources={
#         r"/api/*": {"origins": ["http://localhost:3003", "http://jallapenos.com"]}
#     },
# )
CORS(app)
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/api/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        if not os.path.exists(app.config["UPLOAD_FOLDER"]):
            os.makedirs(app.config["UPLOAD_FOLDER"])
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        return jsonify({"message": "File uploaded successfully"}), 200
    return jsonify({"error": "File type not allowed"}), 400


# Backend API routes
@app.route("/api/process_image", methods=["POST"])
def process_image():
    data = request.json
    if not data or "filename" not in data:
        return jsonify({"error": "No filename provided"}), 400

    filename = os.path.join(app.config["UPLOAD_FOLDER"], data["filename"])
    if not os.path.exists(filename):
        return jsonify({"error": "File not found"}), 404

    img = np.array(Image.open(filename))
    text = pytesseract.image_to_string(img)
    return jsonify({"text": text})


# Backend API routes
@app.route("/api/data", methods=["GET", "POST"])
def api_routes():
    return jsonify({"message": "data from backend"})


@app.route("/admin/<path:path>", methods=["GET", "POST"])
def admin_routes(path):
    return f"Admin route: {path}"


@app.route("/api/images", methods=["GET"])
def get_image_names():
    if not os.path.exists(app.config["UPLOAD_FOLDER"]):
        return jsonify({"error": "Upload folder does not exist"}), 404

    image_files = [
        f for f in os.listdir(app.config["UPLOAD_FOLDER"]) if f.lower().endswith(".png")
    ]
    return jsonify({"images": image_files}), 200


@app.route("/")
@app.route("/<path:path>")
def serve_react_app(path=""):
    print("path", path)
    if path and (path != "favicon.ico"):
        print("found path", path)
        return send_from_directory(app.static_folder, path)
    print("hello")
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))  # Default port is 5001 if not set
    app.run(host="0.0.0.0", port=port)
