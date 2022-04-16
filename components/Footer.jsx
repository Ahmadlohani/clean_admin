import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
const Footer = () => {
    const [state, setState] = useContext(UserContext);
    return (
        <div>
    { state && state.token && 
        <div className="container-fluid my-3" style={{"backgroundColor": "rgb(16, 16, 71)"}}>
            <p className="text-center py-4 text-light">Copyright &copy; Social Media App</p>
        </div>
    }
        </div>
    )
}

export default Footer
