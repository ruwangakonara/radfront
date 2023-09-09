import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, Setpassword] = useState("");
    const [username, setUsername] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:9007', 
        withCredentials: true, 
    });

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        Setpassword(newPassword);
        setError(newPassword !== passwordConfirm ? "Passwords don't match" : "");
    };

    const handlePasswordConfirmChange = (event) => {
        const newPasswordConfirm = event.target.value;
        setPasswordConfirm(newPasswordConfirm);
        setError(newPasswordConfirm !== password ? "Passwords don't match" : "");
    };


    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/signup', {
                email,
                password,
                username,
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
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Sign Up</h2>
                            <form onSubmit={handleSignup}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" value={password}
                                        onChange={handlePasswordChange} />
                                </div>
                                <div className="form-group">
                                    <label>Password Confirm:</label>
                                    <input type="password" className="form-control" value={passwordConfirm}
                                        onChange={handlePasswordConfirmChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={!(password === passwordConfirm) || password.trim() === "" || email.trim() === "" || username.trim() === ""}>Sign Up</button>
                            </form>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
