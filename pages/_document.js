import {
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					rel="stylesheet"
					href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
				<Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
			</body>
		</Html>
	);
}
