import React,{ useState } from "react"
import "./Login.css";
import axios from "axios"
import { useHistory } from "react-router-dom"

const Login=({setLoginUser}) =>{
    const history =useHistory()
    const [user,setUser]=useState({
       
        email:"",
        password:""
       
    })
    const handlechange = e =>{
        const{name,value}=e.target
        // console.log(name,value)
        setUser({
            ...user,
            [name]:value
        })
    }
    const login = () => {
        
        
            axios.post("http://localhost:9002/login",user)
            .then(res =>{
                alert(res.data.message)
                setLoginUser(res.data.user)
                history.push("/")
            } )

        
        
    }
    return(
        <div className="login">
            {/* {console.log("User",user)} */}
            <h1>Login</h1>
            <input type="text"name="email" value={user.email} placeholder="Enter Email" onChange={ handlechange }></input>
            <input type="password"name="password" value={user.password} placeholder="Enter Password"onChange={ handlechange }></input>
            <div className="button"onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={()=> history.push("/Register")}>Register</div>

        </div>
    )

}
export default Login;