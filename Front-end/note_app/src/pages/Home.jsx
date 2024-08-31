import { useNavigate } from "react-router-dom"

function Home(){
    const navigate = useNavigate();
    
    const handleRegister = ()=>{
        navigate("/register")
    }
    return(
        <div>
            <h2>Welcome to the Notes Application</h2>
            <button onClick={handleRegister}>Click here to register</button>
        </div>
    )
}

export default Home