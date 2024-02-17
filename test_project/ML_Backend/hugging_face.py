from transformers import pipeline
import skimage
import numpy as np
from PIL import Image
from flask import Flask, request
from io import BytesIO
import base64
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)









checkpoint = "google/owlvit-base-patch32"
detector = pipeline(model=checkpoint, task="zero-shot-object-detection")

@app.route('/classify', methods=['GET', 'POST'])
def handle_classify():
    if request.method == 'POST':
        base64_image = request.json["ImageData"]
        
        # OpenAI API Key
        api_key = "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"

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }

        payload = {
            "model": "gpt-4-vision-preview",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "What’s in this image? iphone, coffee, waterbottle? response with one word."
                        },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    }
                }
                ]
            }
            ],
            "max_tokens": 300
        }

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

        print(response.json())
        return f"Success"

if __name__ == '__main__':
    app.run(port=5001)