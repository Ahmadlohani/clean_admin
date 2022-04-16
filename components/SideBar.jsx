import {Avatar} from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();
  const [state, setState] = useContext(UserContext);
  const [current, setCurrent] = useState("");
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <div>
    { state && state.token && 
    <div className="sidebar">
        <div href="#" className="my-2 mx-auto">
          <div className="text-center"><Avatar size={40} className="text-center">{ state.user.name[0] }</Avatar>{' '}</div>
          <div className="text-center text-light py-2 px-auto">{ state.user.name }</div>
        </div>
        <Link  href="/home">
        <a className={`nav-link text-white ${current === "/home" && "active"}`}>
            Dashboard
        </a>
        </Link>
        <Link  href="/upload">
        <a className={`nav-link text-white ${current === "/upload" && "active"}`}>
            Content Uploading
        </a>
        </Link>
        <Link  href="/content">
        <a className={`nav-link text-white ${current === "/content" && "active"}`}>
            Content
        </a>
        </Link>
        <Link  href="/user/dashboard">
        <a className={`nav-link text-white ${current === "/user/dashboard" && "active"}`}>
            Blogs
        </a>
        </Link>
        <Link  href="/about">
        <a className={`nav-link text-white ${current === "/about" && "active"}`}>
            About
        </a>
        </Link>
    </div>
    }
    </div>
  )
}

export default SideBar