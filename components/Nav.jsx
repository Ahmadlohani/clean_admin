import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import Navbar from 'react-bootstrap/Navbar';
const Nav = () => {
    const router = useRouter();
    const [state, setState] = useContext(UserContext);

    const logout = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/");
    }
    return (
        <div>
            { state && state.token && 
            // <div className="container-fluid">
            <Navbar style={{"backgroundColor": "rgb(16, 16, 71)"}}>
                <Navbar.Brand>
                <Link href="/home">
                 <a className="nav-link text-light fs-6" aria-current="page"><i> SocialMediaSite</i></a>
                </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    <span className="nav-link text-light pointer mx-3" id="logoutHover" aria-current="page" onClick={logout}>Log Out</span>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            // </div>
            // <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor": "rgb(16, 16, 71)"}}>
            // <div className="container-fluid">
            //     <Link href="/home">
            //     <a className="nav-link text-light" aria-current="page"><i> SocialMediaSite</i></a>
            //     </Link>
            //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            //     <span className="navbar-toggler-icon"></span>
            //     </button>
            //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
            //     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            //     </ul>
            //     <span className="nav-link text-light pointer" id="logoutHover" aria-current="page" onClick={logout}>Log Out</span>
            //     </div>
            // </div>
            // </nav>
            }
        </div>
    )
}

export default Nav
