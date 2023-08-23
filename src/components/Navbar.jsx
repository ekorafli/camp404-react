import React from "react";
import toEko from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <ul className="nav">
                        <img src={toEko} alt="logo" style={{ maxHeight: '40px' }} />
                        <li>
                            <Link to="/" className="nav-link text-white">Beranda</Link>
                        </li>
                        <li>
                            <Link to="/item-management" className="nav-link text-white">Manajemen Barang</Link>
                        </li>
                    </ul>
                    <ul className="nav d-flex">
                        <li>
                            <Link to="/katalog" className="nav-link text-white">Katalog</Link>
                        </li>
                        <li>
                            <Link to="/about" className="nav-link text-white">About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;