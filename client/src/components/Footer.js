import React from "react";
import Logo from "../images/logo.png";

function Footer() {
    return (
        <footer>
            <div className="container">
                <img src={Logo} alt="logo del blog" />
                <span>
                    Hecho con 🧡 y <b>ReactJS</b>
                </span>
            </div>
        </footer>
    );
}

export default Footer;
