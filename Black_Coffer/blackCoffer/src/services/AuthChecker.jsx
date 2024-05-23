import { jwtDecode } from 'jwt-decode';
export const AuthChecker = () =>{
  let isAuthenticated = false;
  const token = localStorage.getItem('token');
  console.log("AuthChecker 1",token);
  
  if (token) {
    // Check if the token is expired
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    isAuthenticated = decodedToken.exp >= currentTime;
    if(!isAuthenticated){
      console.log("AuthChecker 2",isAuthenticated)
      localStorage.removeItem('token');
      return false;
    }
  }
  else if(token === undefined){
    return false;
  }

  return isAuthenticated ;
}