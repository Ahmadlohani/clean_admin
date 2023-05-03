import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import Head from "next/head";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<Head>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
					rel="stylesheet"
				/>
				<link rel="stylesheet" href="/css/styles.css" />
			</Head>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				newestOnTop
			/>
			<SideBar />
			<div className="content">
				<Nav />
				<Component {...pageProps} />
			</div>
		</UserProvider>
	);
}

export default MyApp;
