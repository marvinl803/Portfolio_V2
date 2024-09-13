from flask import Flask, render_template, abort
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('EMAILJS_API_KEY')
service_id = os.getenv('EMAILJS_SERVICE_ID')
template_id = os.getenv('EMAILJS_TEMPLATE_ID')

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def home():
        return render_template("home.html", api_key=api_key, service_id=service_id, template_id=template_id)
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
    