import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
const UserContext = createContext();
const UserProvider = ({ children }) => {
	const [state, setState] = useState({
		user: {},
	});
	const route = useRouter();
	useEffect(() => {
		setState(
			JSON.parse(
				window.localStorage.getItem("bhook_admin_auth")
			)
		);
	}, []);
	return (
		<UserContext.Provider value={{ state, setState }}>
			{children}
		</UserContext.Provider>
	);
};
export { UserContext, UserProvider };
