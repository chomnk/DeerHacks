from flask import Flask, request
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

api_key = os.getenv("API_KEY")
print(api_key)

@app.route('/classify', methods=['GET', 'POST'])
def handle_classify():
    if request.method == 'POST':
        base64_image = request.json["ImageData"]

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
                            "text": "familiar with this json file: 'https://ckan0.cf.opendata.inter.prod-toronto.ca" +
                            "/dataset/76ea33f1-31f0-42ea-a295-385fb4d94ea9/resource/274fde37-233c-485d-bc68-8177f0793412/do" + 
                            "wnload/Waste%20Wizard%20Data%20from%20TOwaste%20App.json'. What is the type of trash in the image? return the " + 
                            "ID and instruction of best match."
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