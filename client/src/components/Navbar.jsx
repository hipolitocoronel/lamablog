import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../context/dataContex";
import Logo from "../images/logo.png";
import Salir from "../images/salir.png";
export default function Navbar() {
    const { currentUser, logout } = useContext(DataContext);
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="logo blog app" />
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to={"/?cat=art"}>
                        ARTE
                    </Link>
                    <Link className="link" to={"/?cat=science"}>
                        CIENCIA
                    </Link>
                    <Link className="link" to={"/?cat=technology"}>
                        TECNOLOGIA
                    </Link>
                    <Link className="link" to={"/?cat=design"}>
                        DISEÑO
                    </Link>
                    <Link className="link" to={"/?cat=cinema"}>
                        CINE
                    </Link>
                    <Link className="link" to={"/?cat=food"}>
                        COMIDA
                    </Link>
                    {currentUser ? (
                        <>
                            <span>
                                <b>{currentUser?.name}</b>
                            </span>
                            <span
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                            >
                                <img src={Salir} alt="" />
                            </span>
                            <span className="write">
                                <Link className="link" to="/write">
                                    Escribir
                                </Link>
                            </span>
                        </>
                    ) : (
                        <span className="write">
                            <Link className="link" to="/login">
                                Ingresar
                            </Link>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
