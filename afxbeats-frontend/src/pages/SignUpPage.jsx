import "./SignUpPage.css"
import {Link} from "react-router"

export function SignUpPage() {
    
  return (
        <div className="sign-up-container">
            <form className="signup-form">
            <div className="form-header">
                <h2>Create your account</h2>
            </div>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter a Username"/>
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="At least 8 characters"/>
            </div>

            <div className="field">
                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Enter it again"/>
            </div>

            <div className="submit-button">Create Account</div>

            <div className="form-footer">
                <p className="form-subtext">Already have one? <Link to="/login">Log in</Link></p>
            </div>
            </form>
        </div>
  );
}