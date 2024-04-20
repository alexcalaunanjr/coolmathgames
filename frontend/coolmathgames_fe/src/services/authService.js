// authService.js

// Replace this with backend URL
const BASE_URL = 'http://your-backend-url';

export async function authenticateUser(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        // Assuming your backend returns JSON data with authentication status
        return data;
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}