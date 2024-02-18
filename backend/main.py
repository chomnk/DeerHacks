from flask import Flask, request
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
import certifi
from pymongo import MongoClient
import base64

file_path = '/home/kali/Desktop/DeerHacks/dataset.json'
with open(file_path, 'r') as file:
    data = json.load(file)
    item_names = [item['item'] for item in data]

app = Flask(__name__)
CORS(app)

load_dotenv()

api_key = os.getenv("API_KEY")

@app.route('/report', methods=['GET', 'POST'])
def handle_report():
    if request.method == 'POST':
        type = request.json["type"]
        lat = request.json["lat"]
        lon = request.json["lon"]
        
        
    uri = "mongodb+srv://Deerhacks:deerhacks@deerhacks.9v30i1z.mongodb.net/"
    client = MongoClient(uri, tlsCAFile=certifi.where())
    db = client.sample_garbage_database
    coll = db["sample_garbage"]
    #myclient = pymongo.MongoClient("mongodb+srv://Deerhacks:deerhacks@deerhacks.9v30i1z.mongodb.net/")
   # mydb = myclient["sample_garbage_database"]
    #mycol = mydb["sample_garbage_collection"]
    
    mydict = {"type": type, "lat": lat, "lon": lon}
    x = coll.insert_one(mydict)
    
    if x.inserted_id != None:
        return "Success"
    else:
        return "Error"
    

@app.route('/classify', methods=['GET', 'POST'])
def handle_classify():
    if request.method == 'POST':
        base64_image = request.json["ImageData"]

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }

        payload_1 = {
            "model": "gpt-4-vision-preview",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": f"familiar yourself with this JSON: {data}, and classify which type of garbage the image belongs to. return json containing 1 field: id"
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

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload_2)

        print(response.json())
        return f"Success"

@app.route('/test', methods=['GET'])
def handle_test():
    if request.method == 'GET':
        img_url = "https://images.pexels.com/photos/7825048/pexels-photo-7825048.jpeg"
        response = requests.get(img_url)
        base64_image = base64.b64encode(response.content).decode('utf-8')

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }

        payload_2 = {
            "model": "gpt-4-vision-preview",
            "messages": [
                {
                    "role": "system",
                    "content": "You will be classifying images based on the given categories."
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": f"Classify the image based on the following categories: {item_names[:1000]}, return message should be the item name only"
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

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload_2)
        json_response = response.json()

        # Extract the content
        content = json_response["choices"][0]["message"]["content"]
        return content

if __name__ == '__main__':
    app.run(port=5001)