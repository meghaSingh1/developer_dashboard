import random
from datetime import datetime, timedelta
from dateutil import parser

from flask import Flask, jsonify, request
from flask.json import JSONEncoder
from flask_cors import CORS
from flask_mongoengine import MongoEngine

app = Flask(__name__)
CORS(app)


app.config['MONGODB_SETTINGS'] = {
    'db': 'developer_dashboard',
    'host': 'localhost',
    'port': 27017,
    'connect': False
}
db = MongoEngine(app)


class Log(db.Document):
    user_id = db.IntField(min_value=0, max_value=999999999)
    timestamp = db.DateTimeField(default=datetime.utcnow, index=True)
    status = db.StringField(max_length=10)
    error_message = db.StringField(max_length=255, sparse=True)
    request = db.DictField()
    response = db.DictField()

    meta = {
        'collection': 'api_logs'
    }

API_FAILURES = {
    '500': 'Internal Server Error',
    '404': 'Not Found',
    '403': 'Forbidden',
}

@app.route('/api/create-logs', methods=['POST'])
def create_log():
    user_id = request.json.get('user_id')

    if random.choice([True, False]):
        status = 'success'
        error_message = None
        response_message = jsonify({'message': 'Hello World!'})
        status_code = 201
    else:
        status = 'failed'
        error_code = random.choice(list(API_FAILURES.keys()))
        error_message = API_FAILURES[error_code]
        response_message = jsonify({'message': 'Hello World!'})
        status_code = error_code

    log = Log(
        user_id=user_id,
        timestamp=datetime.utcnow(),
        status=status,
        error_message=error_message,
        request=extract_request_data(request),
        response=extract_response_data(response_message, status_code)
    )
    log.save()

    return response_message, status_code


@app.route('/api/logs', methods=['GET'])
def get_logs():
    start_datetime = request.args.get('start_datetime')
    end_datetime = request.args.get('end_datetime')
    filter_type = request.args.get('filter_type')

    if filter_type == 'custom':
        if start_datetime and end_datetime:
            try:
                start_datetime = parser.isoparse(start_datetime)
                end_datetime = parser.isoparse(end_datetime)
            except ValueError as e:
                return jsonify({'error': f'Invalid date format: {e}'}), 400
    elif filter_type == 'last_24_hours':
        start_datetime = datetime.utcnow() - timedelta(hours=24)
        end_datetime = datetime.utcnow()
    elif filter_type == 'last_7_days':
        start_datetime = datetime.utcnow() - timedelta(days=7)
        end_datetime = datetime.utcnow()
    else:
        start_datetime = datetime.utcnow() - timedelta(days=30)
        end_datetime = datetime.utcnow()

    filter_params = {
        'timestamp__gte': start_datetime,
        'timestamp__lte': end_datetime,
    }
    filtered_logs = Log.objects(**{key: value for key, value in filter_params.items() if value is not None})

    logs_data = []
    for log in filtered_logs:
        log_data = {
            'user_id': log.user_id,
            'timestamp': log.timestamp,
            'status': log.status,
            'request': log.request,
            'response': log.response,
        }

        # Add error_message if log.status is 'failed'
        if log.status == 'failed':
            log_data['error_message'] = log.error_message

        logs_data.append(log_data)

    filter_params= {key: value for key, value in filter_params.items() if value is not None}
    distinct_user_ids = Log.objects.filter(**filter_params).distinct('user_id')
    total_calls = Log.objects(**filter_params).count()
    total_failures = Log.objects(status='failed', **filter_params).count()

    result = {
        'logs_data': logs_data,
        'total_unique_users': len(distinct_user_ids),
        'total_calls': total_calls,
        'total_failures': total_failures
    }

    return jsonify(result)

def extract_request_data(req):
    return {
        'method': req.method,
        'url': req.url,
        'headers': dict(req.headers),
        'data': req.get_data(as_text=True),
    }

def extract_response_data(response_message, status_code):
    return {
        'message': response_message.json.get('message') if response_message.is_json else None,
        'status_code': status_code,
    }

if __name__ == '__main__':
    app.run(debug=True)
