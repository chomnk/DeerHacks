from flask import Flask, request
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
import certifi
from pymongo import MongoClient
import certifi
import ssl
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)

file_path = 'the_modified_garbage_item_file-2.json'


with open(file_path, 'r') as file:
    data = json.load(file)
    
app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb+srv://Deerhacks:deerhacks@deerhacks.9v30i1z.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=certifi.where())

db = client.sample_garbage_database


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
    

api_key = os.getenv("API_KEY")
print(api_key)

@app.route('/report', methods=['GET', 'POST'])
def handle_report():
    if request.method == 'POST':
        type = request.json.get("type")
        lat = request.json.get("lat")
        lon = request.json.get("lon")
        
    coll = db["sample_garbage"]
    mydict = {"type": type, "lat": lat, "lon": lon}
    x = coll.insert_one(mydict)
    
    if x.inserted_id != None:
        return "Success"
    else:
        return "Error"
    
def extract_content(s):
    first_bracket_index = s.find('{')
    last_bracket_index = s.rfind('}')
    if first_bracket_index != -1 and last_bracket_index != -1 and last_bracket_index > first_bracket_index:
        return s[first_bracket_index:last_bracket_index+1]
    return None

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

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

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

if __name__ == '__main__':
    app.run(port=5001)