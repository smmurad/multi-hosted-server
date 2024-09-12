from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder="static/build")


# Backend API routes
@app.route("/api/data", methods=["GET", "POST"])
def api_routes():
    return jsonify({"message": "data from backend"})


@app.route("/admin/<path:path>", methods=["GET", "POST"])
def admin_routes(path):
    return f"Admin route: {path}"


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
