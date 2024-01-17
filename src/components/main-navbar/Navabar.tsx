import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import css from './Navabar.module.scss'
import { IsActiveProps } from "../../@types/@types";
import { useContext, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { GiSmartphone } from "react-icons/gi";
import AuthContext from "../../context/AuthContext";
import UserConnected from "../user-connected/UserConnected";

const Navabar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [isLogOut] = useState(false);
    if (isLogOut) {
        return <Navigate to="/" />;
    }
    const activeClass = (e: IsActiveProps, clz: string = "") =>
        e.isActive ? `${css.active} ${clz}` : clz;
    return (
        <>
            <Navbar sticky="top" bg="light" style={{ height: "70px", borderBottom: '1px solid #3e3c3c' }}>
                <Container>
                    <nav className={css.navWrapper}>
                        <NavLink to="/" className={activeClass}>
                            <span className="me-auto">MemePin App</span>
                            &nbsp;
                            <GiSmartphone />
                        </NavLink>
                        <Navbar.Toggle className="dropdown" aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {isLoggedIn && <NavLink className={activeClass} to="/add">Add Meme</NavLink>}
                                {<NavLink className={activeClass} to="/about">About</NavLink>}
                                {!isLoggedIn && <NavLink className={activeClass} to="/signup">Sign Up</NavLink>}
                                {!isLoggedIn && <NavLink className={activeClass} to="/login">Sign In</NavLink>}
                                {isLoggedIn && <button style={{ textDecoration: "none", padding: "8px", margin: "30px", color: "black", fontWeight: "bold", borderRadius: "8px", transition: "0.5s" }} onClick={() => {
                                    localStorage.clear()
                                    logout()
                                }}>logout</button>}
                            </Nav>
                            {isLoggedIn && <UserConnected />}


                        </Navbar.Collapse>
                    </nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Navabar;

// npm i bootstrap sass formik yup react-router-dom react-icons
// npm i react-modal sweetalert2 react-bootstrap react-toastify react-loader-spinner axios
