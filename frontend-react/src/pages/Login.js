import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css"
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState();
   
    const navigate = useNavigate();
  

    const login = () => {
    const data = { username: username, password: password };
    
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        setError(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("userId",response.data.userId)
        navigate('/todo');
        window.location.reload();
      }
    });
  };
  return (
    <div className="loginContainer">
      <h2 style={{marginBottom:"40px"}}>Sign in</h2>
      <label>Username</label>
      <input
        type="text" placeholder="Enter your username"
        onChange={(event) => {
          setUsername(event.target.value);
        }} style={{ marginBottom:"10px"}}
      />
      <label>Password</label>
      <input
        type="password" placeholder="***********" 
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login} className="btnLogin"> Sign in </button>
      <p style={{"fontSize":"18px",marginLeft:"22px"}}> Don't have an account? <a href="/Signup" style={{fontSize:"18px",textDecoration: 'none',color:"darkorchid"}}>Sign up</a></p>
      {error?<label style={{color:"red",marginTop:"20px"}}>{error}</label>:null}  
    </div>
  );
}

export default Login;
