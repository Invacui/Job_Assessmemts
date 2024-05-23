import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = 'https://chat-bot-green-brands.onrender.com'; // Replace with your backend API URL

const authRequest = async (isLogin, formData) => {
  try {
    const endpoint = isLogin ? 'login' : 'signup';

    const response = await fetch(`${apiUrl}/auth/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Ensure formData is an object
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.msg); // Success message
      if (data.token) {
        localStorage.setItem('token', data.token );
        return data.payload; // Return the user object
      }
    } else {
      toast.error(data.msg); // Error message
    }
  } catch (error) {
    toast.error('An error occurred'); // Network or other errors
    console.error('Error:', error);
  }
};

export default authRequest;
