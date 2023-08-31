import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Signup(){

    const [email, setEmail] = useState("")
    const [password, Setpassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSignup = async (event) => {
    event.preventDefault(); 
    try {
        const response = await axios.post('http://localhost:9007/signup', {
            email,
            password
        });

        if (response.status === 200) {
            navigate("/posts"); 
        }
    } catch (error) {
        setError(error.message);
        console.error('SignUp failed:', error.message);
    }
}


    return(
        <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => Setpassword(event.target.value)} />
            </label>
            <br />
            <button type="submit">Sign Up</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>

    )

}