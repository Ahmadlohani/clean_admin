import { useContext } from "react";
import { UserContext } from "../context";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthForm from "../components/Form/AuthForm";
import { useRouter } from "next/router";

const index = () => {
	const { state, setState } = useContext(UserContext);
	const [email, SetEmail] = useState("");
	const [password, SetPassword] = useState("");
	const [loading, SetLoading] = useState(false);
	const route = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email == "" || password == "") {
			toast.error("Please fill mandatory fields");
			return;
		}
		console.log(email, password);
		SetLoading(true);
		if (
			email === process.env.ADMIN_ID &&
			password === process.env.ADMIN_PASSWORD
		) {
			handleData(email);
		} else {
			toast.error("Invalid Credentials");
			SetLoading(false);
		}
	};
	const handleData = async (email) => {
		const stateData = {
			token: "123445",
			userId: "1234",
			email: email,
			name: "Ahmad Hassan Khan",
		};
		const userState = { user: stateData };
		setState({
			user: stateData,
		});
		window.localStorage.setItem(
			"bhook_admin_auth",
			JSON.stringify(userState)
		);
		route.push("/home");
	};
	if (state && state.user && route.isReady)
		route.push("/home");
	return (
		<div className="container">
			<div className="row">
				<div className="col text-center">
					<h3 className="my-5">Login</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6 offset-md-3 border py-3">
					<AuthForm
						handleSubmit={handleSubmit}
						email={email}
						SetEmail={SetEmail}
						password={password}
						SetPassword={SetPassword}
						loading={loading}
						page="login"
					/>
				</div>
			</div>
		</div>
	);
};

export default index;
