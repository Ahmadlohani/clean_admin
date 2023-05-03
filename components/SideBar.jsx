import { Avatar } from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../pages/firebase/Config";
import { Button } from "react-bootstrap";

const SideBar = () => {
	const router = useRouter();
	const { state, setState } = useContext(UserContext);
	const [current, setCurrent] = useState("");
	useEffect(() => {
		process.browser && setCurrent(window.location.pathname);
	}, [process.browser && window.location.pathname]);
	const logout = () => {
		if (state && state.user) {
			signOut(auth)
				.then(() => {
					window.localStorage.removeItem(
						"bhook_admin_auth"
					);
					setState(null);
					router.push("/");
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	return (
		<div>
			{state && state.user && (
				<div className="sidebar">
					<div href="#" className="my-2 mx-auto">
						<div className="text-center">
							<Avatar size={40} className="text-center">
								{state &&
									state.user &&
									state.user.name &&
									state.user.name[0]}
							</Avatar>{" "}
						</div>
						<div className="text-center text-light py-2 px-auto">
							{state.user.name}
						</div>
					</div>
					<Link href="/home">
						<a
							className={`nav-link text-white ${
								current === "/home" && "active"
							}`}
						>
							Profile
						</a>
					</Link>
					<Link href="/donors">
						<a
							className={`nav-link text-white ${
								current === "/donors" && "active"
							}`}
						>
							Donors
						</a>
					</Link>
					<Link href="/suppliers">
						<a
							className={`nav-link text-white ${
								current === "/suppliers" && "active"
							}`}
						>
							Suppliers
						</a>
					</Link>
					<Link href="/requests">
						<a
							className={`nav-link text-white ${
								current === "/requests" && "active"
							}`}
						>
							Supplier Requests
						</a>
					</Link>
					<hr className="bg-warning text-warning" />
					<p
						className={`nav-link pointer text-white mx-2`}
						onClick={() => logout()}
					>
						Log Out
					</p>
				</div>
			)}
		</div>
	);
};

export default SideBar;
