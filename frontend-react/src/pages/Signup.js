import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/signup.css"

function Signup(){
    const navigate = useNavigate();
    const [errorDB,setErrorDB]=useState();
    const [input, setInput] = useState({
        username: '',
        password: '',
        confirmPwd: ''
      });
     
    const [error, setError] = useState({
    username: '',
    password: '',
    confirmPwd: ''
    })
     
    const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
        ...prev,
        [name]: value
    }));
    validateInput(e);
    }
    
    const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
        const stateObj = { ...prev, [name]: "" };
    
        switch (name) {
        case "username":
            if (!value) {
            stateObj[name] = "Please enter Username.";
            }
            break;
    
        case "password":
            if (!value) {
            stateObj[name] = "Please enter Password.";
            } else if (input.confirmPwd && value !== input.confirmPwd) {
            stateObj["confirmPwd"] = "Password and Confirm Password does not match.";
            } else {
            stateObj["confirmPwd"] = input.confirmPwd ? "" : error.confirmPwd;
            }
            break;
    
        case "confirmPwd":
            if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
            } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
            }
            break;
    
        default:
            break;
        }
    
        return stateObj;
    });
    }

    const handleSubmit = (e) => {
        // Prevent the default submit and page reload
        e.preventDefault()
        // Handle validations
        const userData = {
            username: input.username,
            password: input.password
          };
        Axios.post("http://localhost:3001/auth/signup", userData).then((response) => {
            if (response.data.error) {
              setErrorDB(response.data.error);
              console.log(response.data.error)
            } else {
              navigate("/");
            }
          });
      };
    return (
        <div className="SignupContainer">
            <h2 style={{marginBottom:"40px"}}> Sign up</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                type="text"
                name="username"
                placeholder='Enter Username'
                value={input.username}
                onChange={onInputChange}
                onBlur={validateInput}></input>
                {error.username && <span className='err' style={{color:"red",marginLeft:"20px"}}>{error.username}</span>}

                <label>Password</label>
                <input
                type="password"
                name="password"
                placeholder='Enter Password'
                value={input.password}
                onChange={onInputChange}
                onBlur={validateInput}></input>
                {error.password && <span className='err' style={{color:"red",marginLeft:"20px"}}>{error.password}</span>}

                <label>Confirm password</label>
                <input
                type="password"
                name="confirmPwd"
                placeholder='Enter Confirm Password'
                value={input.confirmPwd}
                onChange={onInputChange}
                onBlur={validateInput}></input>
                {error.confirmPwd && <span className='err' style={{color:"red",marginLeft:"20px"}}>{error.confirmPwd}</span>}

                <input type="submit" value="Sign up" name="btnSignup"/>
                <p style={{fontSize:"18px",marginLeft:"20px"}}> Already have an account? <a href="/" style={{textDecoration: 'none',color:"darkorchid",fontSize:"18px"}}>Sign in</a></p>
                {errorDB?<label style={{color:"red",marginTop:"20px"}}>{errorDB}</label>:null} 
            </form>
            
      </div>
    );
}
export default Signup;