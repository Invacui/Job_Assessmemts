import React, { useState } from 'react';
import authRequest from '../api/Data_Handler';
import '../styles/AuthForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); //navigate to another page
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const user = await authRequest('login', formData)
      if(user){
        toast.success('Login successful');
        navigate('/dashboard');
        console.log('Login data:', user);
      }
    } else {
      authRequest(false, formData)
      console.log('Signup data:', formData);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="signup-form">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            <button type="submit">Signup</button>
          </form>
        </div>
      )}
      <button onClick={toggleForm}>{isLogin ? 'Switch to Signup' : 'Switch to Login'}</button>
      <ToastContainer />
    </div>
    
  );
};

export default AuthForm;
