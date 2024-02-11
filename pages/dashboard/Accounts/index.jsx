import AppDrawer from "../../../components/AppDrawer/AppDrawer";
import { Box, Button, Grid, Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import ProAccounts from "../../../components/Tables/ProAccounts";
import CustomerAccounts from "../../../components/Tables/CustomerAccounts";

const Accounts = () => {
	const [customers, setCustomers] = useState([]);
	const [pros, setPros] = useState([]);
	const [loading, setLoading] = useState(false);
	const [mode, setMode] = useState("pro");
	const loaderImage = "/images/loader.gif";

	useEffect(() => {
		getUsers();
	}, []);
	const getUsers = async () => {
		const users = query(collection(db, "Users"), orderBy("createdAt", "desc"));
		setLoading(true);
		onSnapshot(users, (querySnapshot) => {
			let custs = [];
			let pros = [];
			if (querySnapshot.size == 0) {
				setLoading(false);
				setCustomers([]);
				setPros([]);
			} else {
				setLoading(false);
				querySnapshot.forEach((doc) => {
					doc.data().wallet &&
						(doc.data().role == "customer"
							? custs.push({ key: doc.id, ...doc.data() })
							: pros.push({ key: doc.id, ...doc.data() }));
				});
				setCustomers(custs);
				setPros(pros);
			}
		});
	};
	const handlefilterUsers = (mode) => {
		setLoading(true);
		setMode(mode);
		setLoading(false);
	};
	return (
		<div>
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
			<AppDrawer page={"Accounts"}>
				<Box sx={{ flexGrow: 1 }}>
					<Box
						display={"flex"}
						alignItems={"center"}
						bgcolor={"#000000"}
						borderRadius={1}
						padding={1}
						mb={1}
						flexWrap={"wrap"}
						sx={{
							justifyContent: { xs: "center", md: "space-between" },
							flexDirection: { xs: "column", md: "row" },
						}}
					>
						<Typography variant="h6" fontSize={20} color={"#fff"}>
							Accounts
						</Typography>
						<Box display={"flex"} alignItems={"center"} gap={1}>
							<Button
								variant={mode == "pro" ? "contained" : "outlined"}
								color="success"
								onClick={() => handlefilterUsers("pro")}
							>
								Professionals
							</Button>
							<Button
								variant={mode == "customer" ? "contained" : "outlined"}
								color="secondary"
								onClick={() => handlefilterUsers("customer")}
							>
								Customers
							</Button>
						</Box>
					</Box>
					{(mode == "pro" && Object.keys(pros).length > 0) ||
					(mode == "customer" && Object.keys(customers).length > 0) ? (
						<Grid container spacing={2}>
							<Grid item xs={12}>
								{mode == "pro" ? (
									<ProAccounts data={pros} />
								) : (
									<CustomerAccounts data={customers} />
								)}
							</Grid>
						</Grid>
					) : (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "50vh",
							}}
						>
							<Typography>No Accounts Found</Typography>
						</Box>
					)}
				</Box>
			</AppDrawer>
		</div>
	);
};

export default Accounts;
