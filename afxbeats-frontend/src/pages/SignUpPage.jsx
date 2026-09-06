import "./SignUpPage.css"
import { Link,useNavigate } from "react-router"
import { useState } from "react"
import axios from "axios"

export function SignUpPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {    
        e.preventDefault()
        if (password !== confirmPassword) {
            return
        }
        try {
            await axios.post("http://localhost:3000/api/users/signup", { username, password })
            navigate("/login")
        } catch (error) {
            console.error("Error signing up:", error)
        }
    }

  return (
        <div className="sign-up-container">
            <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <h2>Create your account</h2>
            </div>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter a Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="field">
                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Enter it again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>

            <button type="submit" className="submit-button">
                Create Account
            </button>

            <div className="form-footer">
                <p className="form-subtext">Already have one? <Link to="/login">Log in</Link></p>
            </div>
            </form>
        </div>
  );
}