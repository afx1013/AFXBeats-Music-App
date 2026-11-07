import "./SongContextMenu.css"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { IoIosArrowForward } from "react-icons/io";


export function SongContextMenu({ x, y, options, onClose }) {
    const menuRef = useRef(null)
    const [pos, setPos] = useState({ left: x, top: y })

    useLayoutEffect(() => {
        const { width, height } = menuRef.current.getBoundingClientRect()
        setPos({
            left: Math.min(x, window.innerWidth - width - 8),
            top: Math.min(y, window.innerHeight - height - 8)
        })
    }, [x, y])

    useEffect(() => {
        function handleMouseDown(e) {
            if (!menuRef.current?.contains(e.target)) {
                onClose()
            }
        }
        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("scroll", onClose, true)
        window.addEventListener("resize", onClose)
        return () => {
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("scroll", onClose, true)
            window.removeEventListener("resize", onClose)
        }
    }, [onClose])

    return (
    <ul ref={menuRef} className="context-menu" style={pos}>
        {options.map((option) => (
            <li
                key={option.label}
                className={`context-menu-item ${option.submenu ? "has-submenu" : ""} ${option.disabled ? "disabled" : ""}`}
                onClick={() => {
                    if (option.submenu ) {
                        return
                    }
                    option.onClick()
                    onClose()
                }}
            >
                {option.label}
                {option.submenu && <span className="submenu-arrow"><IoIosArrowForward /></span>}
                {option.submenu && (
                    <ul className="context-submenu">
                        {option.submenu.map((sub) => (
                            <li
                                key={sub.label}
                                className={`context-menu-item ${sub.disabled ? "disabled" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (sub.disabled){
                                        return
                                    }
                                    sub.onClick()
                                    onClose()
                                }}
                            >
                                {sub.label}
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        ))}
    </ul>
)
}