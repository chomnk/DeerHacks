from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
import certifi
from pymongo import MongoClient
import base64

from bson import ObjectId

# Custom JSON encoder that converts ObjectId to string
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

file_path = 'the_modified_garbage_item_file-2.json'
with open(file_path, 'r') as file:
    data = json.load(file)
    item_names = [item['item'] for item in data]

app = Flask(__name__)
CORS(app)

load_dotenv()

client = MongoClient('mongodb+srv://Deerhacks:deerhacks@deerhacks.9v30i1z.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=certifi.where())

db = client.sample_garbage_database


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
    

api_key = os.getenv("API_KEY")

@app.route('/locations', methods=['GET', 'POST'])
def handle_locations():
    if request.method == 'POST':
        result = []
        coll = db["sample_garbage"]
        all_documents = coll.find()
        for document in all_documents:
            result.append(document)
    return json.dumps(result, cls=JSONEncoder)
    
    
@app.route('/report', methods=['GET', 'POST'])
def handle_report():
    if request.method == 'POST':
        garbage_type = request.json.get("garbage_type")
        lat = request.json.get("lat")
        lon = request.json.get("lon")
        
        coll = db["sample_garbage"]
        mydict = {"type": garbage_type, "lat": lat, "lon": lon}
        x = coll.insert_one(mydict)
        
        if x.inserted_id != None:
            return "Success"
        else:
            return "Error"
    else:
        return "Invalid method"
        
        

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
        temp1 = response.json()["choices"][0]["message"]["content"]
        temp2 = json.loads(extract_content(temp1))
        
        
        result = db["garbage_type"].find_one({'id': temp2["id"]})
        print(result)
        json_str = json.dumps(result, cls=JSONEncoder)
        print(json_str)
        
        if json_str != None:
            return json_str
        
        return json_str
    else:
        return "Invalid method"

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
    else:
        return "Invalid method"

if __name__ == '__main__':
    app.run(port=5001)