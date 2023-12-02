import unittest
import json
import random
from datetime import datetime
from flask import Flask, jsonify
from flask_testing import TestCase
from app import app, Log

class TestAPIs(TestCase):
    def create_app(self):
        app.config['TESTING'] = True
        app.config['MONGODB_SETTINGS'] = {
            'db': 'test_db',
            'host': 'mongomock://localhost',
        }
        return app

    def setUp(self):
        Log.objects().delete()

    def test_create_log_success(self):
        response = self.client.post('/api/create-logs', json={'user_id': 1})
        self.assertEqual(response.status_code, 201)

        log = Log.objects().first()
        self.assertIsNotNone(log)
        self.assertEqual(log.user_id, 1)
        self.assertEqual(log.status, 'success')
        self.assertIsNone(log.error_message)

    def test_create_log_failure(self):
        with unittest.mock.patch('random.choice', return_value=False):
            response = self.client.post('/api/create-logs', json={'user_id': 1})

        self.assertNotEqual(response.status_code, 201)

        log = Log.objects().first()
        self.assertIsNotNone(log)
        self.assertEqual(log.user_id, 1)
        self.assertEqual(log.status, 'failed')
        self.assertIsNotNone(log.error_message)

    def test_get_logs(self):
        # Create some test logs
        response = self.client.post('/api/create-logs', json={'user_id': 1})
        self.assertEqual(response.status_code, 201)

        with unittest.mock.patch('random.choice', return_value=False):
            response = self.client.post('/api/create-logs', json={'user_id': 2})

        response = self.client.get('/api/logs')
        self.assertEqual(response.status_code, 200)

        logs_data = json.loads(response.data)
        self.assertEqual(len(logs_data), 2)
        self.assertEqual(logs_data[0]['user_id'], 1)
        self.assertEqual(logs_data[1]['user_id'], 2)

if __name__ == '__main__':
    unittest.main()
