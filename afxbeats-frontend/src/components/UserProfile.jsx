import "./UserProfile.css"
import UserIcon from "../assets/user.png" 

export function UserProfile() {
    return (
        <div className="user-profile-container">
            <img src={UserIcon} alt="profile"/>
            <p>Andrew Xu</p>
        </div>
    )
}