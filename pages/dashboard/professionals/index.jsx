import AppDrawer from "../../../components/AppDrawer/AppDrawer";
import { Box, Grid, Typography } from "@mui/material";
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import Professional from "../../../components/Card/Professional";

const AppProfessionals = () => {
	const [users, setUsers] = useState(null);
	const [loading, setLoading] = useState(false);
	const loaderImage = "/images/loader.gif";
	useEffect(() => {
		getUsers();
	}, []);
	const getUsers = async () => {
		const users = query(
			collection(db, "Users"),
			where("role", "==", "professional"),
			orderBy("createdAt", "desc")
		);
		setLoading(true);
		onSnapshot(users, (querySnapshot) => {
			let items = [];
			if (querySnapshot.size == 0) {
				setLoading(false);
			} else {
				setLoading(false);
				querySnapshot.forEach((doc) => {
					items.push({ key: doc.id, ...doc.data() });
				});
			}
			setUsers(items);
		});
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
			<AppDrawer page={"Professionals"}>
				<Box sx={{ flexGrow: 1 }}>
					<Typography
						variant="h5"
						component="h5"
						bgcolor={"#000"}
						borderRadius={1}
						mb={1}
						color={"#fff"}
						textAlign={"center"}
						paddingY={1}
						fontWeight={"bold"}
					>
						Professionals
					</Typography>
					{users ? (
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Professional data={users} />
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
							<Typography>No Professionals yet</Typography>
						</Box>
					)}
				</Box>
			</AppDrawer>
		</div>
	);
};

export default AppProfessionals;
