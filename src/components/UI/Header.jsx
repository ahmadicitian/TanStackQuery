import React from 'react'
import { NavLink } from 'react-router-dom'
const Header = () => {
    return (
        <header>
            <div>
                <NavLink to="/">TanstackQuery</NavLink>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/old">FetchOld</NavLink>
                    </li>
                    <li>
                        <NavLink to="/tq"> FetchTQ </NavLink>
                    </li>

                </ul>
            </div>
        </header>
    )
}

export default Header