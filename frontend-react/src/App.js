
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Todo from './pages/Todo';
import Signup from './pages/Signup';
import { AuthContext } from './helpers/AuthContext';
import { useState } from 'react';
import "./App.css"

function App() {
    const [authState,setAuthState] = useState(false);
    return (
        <div className="App" >
          <AuthContext.Provider value={{authState,setAuthState}}>
              <Routes>
                  {!localStorage.getItem("accessToken") && (
                    <>
                        <Route path='/' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                    </>
                    )
                  }
                  {
                    localStorage.getItem("accessToken") &&(
                      <Route path='/todo' element={<Todo/> } /> 
                      
                    )
                  }    
                </Routes>
          </AuthContext.Provider>   
    </div>
  );
}

export default App;
