import React, { useState, useEffect, useRef } from 'react';
import "../styles/invalid_users.css";
const InvalidUser = () => {
    const [timer, setTimer] = useState(5);

    const updateTimer = () => {
      setTimer((prevTimer) => prevTimer - 1);
    };
    
    useEffect(() => {
      const countdownInterval = setInterval(updateTimer, 1000);
    
      // Redirect after 5 seconds
      setTimeout(() => {
        console.log('Redirecting to login page...');
        window.location.href = '/' 
      }, 5000);
    
      return () => {
        clearInterval(countdownInterval);
      };
    }, []); // Empty dependency array ensures this effect runs only once
    
    return (
      <div className='InvalidUser_main_box'>
        <div className="InvalidUser_sub_box">
            <div className='Background_blur'></div>
          <h3>Oops! Looks like you are not allowed here. You can try logging in.</h3>
          <h1>401</h1>
          <h5>You will be redirected to the login page in {timer} seconds.</h5>
        </div>
      </div>
    );
};

export default InvalidUser;