import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login(){
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        const payload  = {
            email,
            password
        }
        try {
            const response = await fetch("https://notes-app-0vqm.onrender.com/user/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(payload)
            });
            const data = await response.json();
            if(data.error){
                alert(data.error)
            }
            else{
                if(data.token){
                    localStorage.setItem("token",data.token)
                    alert(`${data.message}`)
                    navigate("/note")
                }
                else{
                    alert(`${data.message}`)
                }
            }
        } catch (error) {
            alert("Error while login in")
            console.log(error)
        }
    
    }

    return(
        <div>
            <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login