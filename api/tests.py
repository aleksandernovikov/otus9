from rest_framework import status
from rest_framework.test import APITestCase


class TestUser(APITestCase):
    fixtures = ['user']

    def test_user_create(self):
        response = self.client.post('/api/register', data={
            'username': 'test_user',
            'email': 'testuser@mail.ru',
            'password': 'SecretPassword'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_wrong_email_user_create(self):
        response = self.client.post('/api/register', data={
            'username': 'test_user',
            'email': 'testuser at mail.ru',
            'password': 'SecretPassword'
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        errors = response.json()
        self.assertIn('email', errors)

    def test_user_login(self):
        response = self.client.post('/api/login', data={
            'username': 'user',
            'password': 'testtest123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
