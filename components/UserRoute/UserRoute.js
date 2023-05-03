import { useState, useContext } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const UserRoute = ({ children }) => {
	const route = useRouter();
	const [ok, setOk] = useState(false);
	const { state } = useContext(UserContext);
	useEffect(() => {
		if (state && state.user) {
			setOk(true);
		} else {
			route.push("/");
		}
	}, []);
	return !ok ? (
		<SyncOutlined
			spin
			className="d-flex justify-content-center display-1 text-primary p-5"
		/>
	) : (
		<>{children}</>
	);
};
export default UserRoute;
