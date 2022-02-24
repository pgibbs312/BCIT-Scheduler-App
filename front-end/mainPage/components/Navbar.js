import React from 'react'
import logo from "../logo.png"

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='container'>
                <img className='logo' src={logo} alt="BCIT logo"></img>
                <span className='logo-title'>TECH HUB</span>
                <span className='logo-subtitle'>Study Room Booking System</span>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#"> Luke@google.ca
                        </a>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" href="#">Log Out</button>
                    </li>

                </ul>

            </div>

        </nav>

    )
}

export default Navbar
