import "./Layout.css"  
import { Outlet } from "react-router"
import { Menu } from "../components/Menu.jsx"
import { useState } from "react";

export function Layout() {
      const [isCollapsed, setCollapse] = useState(false);

    return (
        <div className="page-container">
            <div className="page-content-container">
                <Menu isCollapsed={isCollapsed} setCollapse={setCollapse}/>
                <Outlet/>
            </div>
        </div>
    );
}