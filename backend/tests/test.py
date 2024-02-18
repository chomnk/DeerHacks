


from openai import OpenAI
client = OpenAI()
import json

file_path = 'the_modified_garbage_item_file-2.json'


with open(file_path, 'r') as file:
    data = json.load(file)

completion = client.chat.completions.create(
  model="gpt-4-vision-preview",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": f"familiar with following json: {data}"}
  ], 
  max_tokens=500
)

print(completion)

'''

from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4-vision-preview",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "Did you understand the content in the file?"},
        {
          "type": "text",
          "text": "https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/76ea33f1-31f0-42ea-a295-385fb4d94ea9/resource/274fde37-233c-485d-bc68-8177f0793412/download/Waste%20Wizard%20Data%20from%20TOwaste%20App.json"
        },
      ],
    }
  ],
  max_tokens=300,
)

print(response.choices[0])
'''