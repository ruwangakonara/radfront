import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, Setpassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:9007', // Set your server's base URL
        withCredentials: true, // Send cookies with the request
    });

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/signup', {
                email,
                password,
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);

                navigate("/posts");
            }
        } catch (error) {
            setError(error.message);
            console.error('SignUp failed:', error.message);
        }
    }

    return (
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
                    <input type="password" value={password} onChange={(event) => {
                        Setpassword(event.target.value);
                        if (password !== passwordConfirm) {
                            setError("Passwords don't match");
                        } else {
                            setError("");
                        }
                    }} />
                </label>
                <label>
                    Password Confirm:
                    <input type="password" value={passwordConfirm} onChange={(event) => {
                        setPasswordConfirm(event.target.value);
                        if (password !== passwordConfirm) {
                            setError("Passwords don't match");
                        } else {
                            setError("");
                        }
                    }} />
                </label>
                <br />
                <button type="submit" disabled={!(password === passwordConfirm) || password === "" || email === ""}>Sign Up</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
