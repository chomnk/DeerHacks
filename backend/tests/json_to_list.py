import json

file_path = '/home/kali/Desktop/DeerHacks/dataset.json'

with open(file_path, 'r') as file:
    data = json.load(file)

item_names = [item['item'] for item in data]