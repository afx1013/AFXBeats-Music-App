import "./UserProfile.css"
import UserIcon from "../assets/user.png" 

export function UserProfile({ currentUserName }) {
    return (
        <div className="user-profile-container">
            <img src={UserIcon} alt="profile"/>
            <p>{currentUserName || "Guest"}</p>
        </div>
    )
}