import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register(){
    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("");
    const navigate = useNavigate();

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const payload = {
            name,
            email,
            password,
            gender,
            age
        }

        try {
                await fetch("https://notes-app-0vqm.onrender.com/user/register", {
                method: "POST",  
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),  
              });
            alert("User registered successfully");
            navigate("/login"); 
          } catch (error) {
            alert("Error while registering the user");
            console.log(error);
          }
        };
      
    return(
        <div>
            <input type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <input type="number" placeholder="Enter age" value={age} onChange={(e)=>setAge(e.target.value)} />
            <input type="text" placeholder="Enter gender" value={gender} onChange={(e)=>setGender(e.target.value)} />
            <button onClick={handleSubmit}>Register</button>
        </div>
    )

}

export default Register