import React,{ useState } from "react"
import "./register.css";
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register=() =>{
    const history =useHistory()
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:""
    });
    const handlechange = e =>{
        const{name,value}=e.target
        // console.log(name,value)
        setUser({
            ...user,
            [name]:value
        })
        
    }
    const register = () => {
        const{ name,email,password,confirmpassword}=user
        if(name && email && password && (password===confirmpassword)){
            // alert("posted")
            axios.post("http://localhost:9002/register",user)
            .then(res =>{
                alert(res.data.message)
                history.push("/Login")
            }) 

        }else{
            alert("invalid .....")
        }
        
    }
    return(
        <div className="register">
            {console.log("User",user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Enter Name" onChange={ handlechange }></input>
            <input type="text"  name="email" value={user.email} placeholder="Enter Email"onChange={handlechange}></input>
            <input type="password"name="password" value={user.password} placeholder="Enter Password"onChange={handlechange}></input>
            <input type="password" name="confirmpassword" value={user.confirmpassword}placeholder="confirm Password"onChange={handlechange}></input>
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={()=> history.push("/Login")}>Login</div>

        </div>
    )

}
export default Register;