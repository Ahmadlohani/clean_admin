import { Box, Container, Grid, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import BookingData from "../../../components/Card/BookingData";
import AccountData from "../../../../components/Card/AccountData";

const AccountDetail = () => {
	const route = useRouter();
	const { id } = route.query;
	const loaderImage = "/images/loader.gif";
	const [account, setAccount] = useState(null);
	const [loading, setLoading] = useState(false);
	const [userType, setUserType] = useState("");
	useEffect(() => {
		if (id) {
			getAccount();
		}
	}, [id]);
	const getAccount = async () => {
		setLoading(true);
		const docRef = doc(db, "Users", id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			docSnap.data().role === "customer"
				? setUserType("customer")
				: setUserType("pro");
			setAccount({ key: docSnap.id, ...docSnap.data().wallet });
			setLoading(false);
		} else {
			setLoading(false);
			route.push("/dashboard/Accounts");
		}
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
			<Box sx={{ flexGrow: 1 }}>
				{account ? (
					<Container
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginY: 2,
						}}
					>
						<Grid
							container
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Grid item xs={12}>
								<AccountData data={account} mode={userType} />
							</Grid>
						</Grid>
					</Container>
				) : (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "50vh",
						}}
					>
						<Typography>No Account Data</Typography>
					</Box>
				)}
			</Box>
		</div>
	);
};

export default AccountDetail;
