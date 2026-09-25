import "./LoginPage.css"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import axios from "axios"


export function LoginPage({ setCurrentUserName }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
    e.preventDefault()

    try {
        const response = await axios.post("http://localhost:3000/api/users/login", { username, password })
        const { token, user } = response.data
        localStorage.setItem("token", token)
        localStorage.setItem("username", user.username)
        setCurrentUserName(user.username)
        navigate("/explore")
    } catch (error) {
        console.error("Error logging in:", error)
    }
}

    return (
        <div className="login-page-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-header">
                    <h2>Log in to your account</h2>
                </div>

                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit" className="submit-button">
                    Log In
                </button>

                <div className="form-footer">
                    <p className="form-subtext">Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </form>
        </div>
    );
}