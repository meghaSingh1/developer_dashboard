import requests
import json


url = 'http://localhost:5000/api/create-logs'

log_data = {
    'user_id': 10,
}

json_data = json.dumps(log_data)
headers = {'Content-Type': 'application/json'}
response = requests.post(url, data=json_data, headers=headers)

print(response.status_code)
print(response.json())

# filter_type = 'last_7_days'
# url = f'http://localhost:5000/api/logs?filter_type={filter_type}'

# headers = {'Content-Type': 'application/json'}
# response = requests.get(url, headers=headers)

# print(response.status_code)
# print(response.json())

