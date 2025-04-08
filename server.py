from flask import Flask, jsonify
from src.api.bithumbClient import get_my_assets
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # React에서 호출할 수 있도록 CORS 허용

@app.route("/api/assets", methods=["GET"])
def assets():
    try:
        data = get_my_assets()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
