import React, { useState,  useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import "../css/todo.css"
function Todo(){
    
    const [task,setTask] = useState([]);
    const [allLists,setAllLists]= useState([]);
    const [checked,setChecked] = useState([]);
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const id= localStorage.getItem("userId")
    console.log("id",id)
    useEffect(() => {
        navigate("/todo")
        axios.get(`http://localhost:3001/todolist/${id}`).then((res)=>{
            setAllLists(res.data);
        });
    },[]);

    const Add =() =>{
        
        axios.post('http://localhost:3001/todolist/',{"task":task,"UserId":id},
        {   headers:
                {accessToken:localStorage.getItem("accessToken"),
        },
    }
    )
    .then((response)=> 
        {
            if (response.data.error) {
            setError(response.data.error);
            } else
            {   
                window.location.reload();
                console.log("task",task)
            }}
        )
    }

    
    // Generate string of checked items
    var checked_count=0;
    var checkedItems = checked.map((item,key) => {
        checked_count++;
    });

    var task_count=0;
    var taskItems = allLists.map((item,key)=>{
        task_count++;
    })

    var unchecked_count= task_count-checked_count;
    
    // Add/Remove checked item from list
    const checkHandle= (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
            console.log(" checked in update list")
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
            console.log(" not checked in update list")
        }
        setChecked(updatedList);
        console.log("print checked list",checked)
        };

    
    // Return classes based on whether item is checked
    var isChecked = (item) => checked.includes(item) ? "checked-item" : "not-checked-item";
    
    // Clear all tasks
    const clearTask= () =>{
        axios.delete(`http://localhost:3001/todolist/${id}`,{
            headers:
            { accessToken :localStorage.getItem("accessToken")},
        }).then(()=>{
            window.location.reload();
            console.log("delete sucess")
        })
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/signup");
        window.location.reload();
      };
    return(
        <div className="main">
            <div className="TodoContainer">
                <div className="Top">
                  <nav className="navbar">
                    <div className="upper">
                        <h2>Daily Todo List</h2> 
                        <button className="btnLogout" onClick={logout} >Logout</button>
                    </div>
                    </nav>
                <div className="todoInput">
                    <input placeholder="Enter your task" className="inputTask" onChange={(event) => {
            setTask(event.target.value);
            }} autoComplete="off"/> 
                    <button onClick={Add} className="addBtn">Add</button>

                </div>
                {error?<label style={{color:"red",marginLeft:"35px"}}>{error}</label>:null}  
            
            </div>
            
            <div className="middle" >
             {allLists.map((item, key) => {
                 return (
                    <div key={key} className="tasklist" style={{marginBottom:"20px"}}>
                        <input type="checkbox" onChange={checkHandle} value={item.task} />
                        <span className={isChecked(item.task)} style={{marginLeft:"10px",paddingBottom:"200px"}} >{item.task}</span>
                     </div>
                        );
                })}
            </div>
            <hr style={{width:"500px"}}></hr>
            <div className="Bottom">
                <p style={{marginRight:"200px",fontSize:"17px", color:"gray"}}> {unchecked_count} todo items left</p>
                <button onClick={clearTask} className="btnClear">Clear all</button>
            </div>
            
          
            </div>
        </div>
        
    );
}

export default Todo