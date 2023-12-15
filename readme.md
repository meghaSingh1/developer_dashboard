# Developer Analytics Dashboard

The project utilizes Flask for the backend APIs, React/JavaScript for the frontend, and MongoDB as the database. The choice of MongoDB allows for flexibility in the log schema, accommodating variable document structures.

Loom Demo Link: https://www.loom.com/share/956aa31534ef4ffc94e4786ee1c9a18b

## Table of Contents

Getting Started <br />
Prerequisites <br />
Installation <br />
Backend APIs <br />
Frontend <br />
Dashboard Features <br />
Time Filter <br />
Total Unique Users <br />
Total Number of Calls <br />
Total Number of Failures <br />
Graphs <br />
Logs Table <br />
Running the Project <br />
License <br />

# Getting Started

# Prerequisites
Python 3.x <br />
Node.js and npm <br />
Flask <br />
React <br />

# Installation
1. Clone the repository:

```
git clone https://github.com/meghaSingh1/developer_dashboard.git
```

2. Install backend dependencies:

```
cd developer_dashboard
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. Install frontend dependencies:

```
cd developer-analytics-dashboard
npm install
```

# Backend APIs

The backend consists of two APIs: <br />

### 1. Create Log API (/api/create-log):

This API accepts a POST request to create logs. It requires the following JSON payload: <br />

```
curl -X POST -H "Content-Type: application/json" -d '{"user_id": "123", "status": "success", "request_data": "some data", "response_data": "some response"}' http://localhost:5000/api/create-log
```

or by
```python3 test.py```

### 2. Logs API (/api/logs):

This API retrieves logs and supports filtering based on the provided time range. <br />

## Frontend

The frontend is developed using React, providing a responsive and modern user interface. <br />

## Dashboard Features

Time Filter <br />
The dashboard includes a time filter with three options: <br/ >

Last 24 hours <br />
Last 7 days <br />
Custom time range <br />
Total Unique Users <br />
Displays the total number of unique users who have used the API within the selected time period. <br />

### Total Number of Calls
Shows the total number of calls made to the API in the given time period. <br />

### Total Number of Failures
Indicates the total number of API calls that failed in the given time period. Random API failures are simulated to demonstrate this feature. <br />

### Graphs
The dashboard includes two graphs showing the number of users, calls, and failures over time within the selected time period. <br />

## Logs Table

A table displays logs sorted by timestamp, featuring the following columns: <br />

User ID <br />
Timestamp <br />
Status (Success or failure) <br />
Error message (Present only if the status is failure) <br />
Request (The request object) <br />
Response (The response object) <br />

## Running the Project

### 1.Start the Flask backend:

```
cd developer_dashboard
python app.py
```

### Start the React frontend:

```
cd developer-analytics-dashboard
npm start
```

Visit http://localhost:3000 to access the Developer Analytics Dashboard.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

![dashboard](https://github.com/meghaSingh1/developer_dashboard/assets/30502286/b617be7f-45e2-4c82-9eaf-76b30246bfb5)

![dashboard3](https://github.com/meghaSingh1/developer_dashboard/assets/30502286/378db9f5-7d33-44b7-a190-8ec84efd26b5)

![dashboard2](https://github.com/meghaSingh1/developer_dashboard/assets/30502286/9b92ea93-29d4-411e-a71b-96c22d0dd97f)



