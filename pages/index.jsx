import {
	Box,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
	const route = useRouter();
	const loaderImage = "/images/loader.gif";
	const [details, setDetails] = useState({
		username: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const handleChange = (name, val) => {
		setDetails({
			...details,
			[name]: val,
		});
	};
	const handleSubmit = async () => {
		try {
			if (details.username === "" || details.password === "") {
				alert("Please fill all the fields");
				return;
			}
			setLoading(true);
			const { data } = await axios.post(
				process.env.NEXT_PUBLIC_API_URL + "auth",
				{
					username: details.username,
					pswd: details.password,
				}
			);
			if (data.success) {
				Cookies.set("clean_admin_auth", "admin", {
					expires: 7,
				});
				setLoading(false);
				route.push("/dashboard");
			} else {
				setLoading(false);
				alert("Wrong Credentials");
				return;
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	return (
		<Container
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{loading && (
				<Box
					sx={{
						position: "absolute",
						backgroundColor: "#000000",
						opacity: 0.7,
						zIndex: 999,
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<img src={loaderImage} width={100} height={100} />
				</Box>
			)}
			<Grid
				container
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Grid
					item
					xs={12}
					sm={6}
					border={"none"}
					padding={5}
					borderRadius={5}
					bgcolor={"#f5f5f5"}
				>
					<Typography
						variant={"h5"}
						textAlign={"center"}
						marginY={1}
						fontWeight={"bold"}
						color={"#333"}
					>
						Admin Login
					</Typography>
					<TextField
						id="outlined-basic"
						label="Username"
						variant="outlined"
						fullWidth
						sx={{ my: 1 }}
						onChange={(e) => handleChange("username", e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						label="Password"
						variant="outlined"
						fullWidth
						sx={{ my: 1 }}
						onChange={(e) => handleChange("password", e.target.value)}
					/>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}
