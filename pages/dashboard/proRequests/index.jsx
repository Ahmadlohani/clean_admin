import AppDrawer from "../../../components/AppDrawer/AppDrawer";
import { Box, Grid, Typography } from "@mui/material";
import {
	collection,
	deleteField,
	doc,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useEffect, useState } from "react";
import ProRequests from "../../../components/Card/ProRequests";
import { toast } from "react-toastify";
import {
	sendEmailVerification,
	signInWithEmailAndPassword,
} from "firebase/auth";
const NewProRequests = () => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(false);
	const loaderImage = "/images/loader.gif";

	useEffect(() => {
		getRequests();
	}, []);
	const getRequests = async () => {
		const requests = query(
			collection(db, "Users"),
			where("role", "==", "professional"),
			where("status", "==", "requested"),
			orderBy("createdAt", "desc")
		);
		setLoading(true);
		onSnapshot(requests, (querySnapshot) => {
			let items = [];
			if (querySnapshot.size == 0) {
				setLoading(false);
				setRequests([]);
			} else {
				setLoading(false);
				querySnapshot.forEach((doc) => {
					items.push({ key: doc.id, data: doc.data() });
				});
			}
			setRequests(items);
		});
	};
	const handleAccept = async (docId, email, pswd) => {
		const confirm = window.confirm("Are you sure?");
		if (!confirm) return;
		setLoading(true);
		signInWithEmailAndPassword(auth, email, pswd)
			.then(() => {
				handleMailVerification(docId);
			})
			.catch((error) => {
				setLoading(false);
				toast.error(error.message);
				console.log(error);
			});
	};
	const handleMailVerification = async (docId) => {
		try {
			const proRef = doc(db, "Users", docId);
			const request = {
				status: "verified",
				pswd: deleteField(),
			};
			await sendEmailVerification(auth.currentUser);
			await updateDoc(proRef, request);
			setLoading(false);
			toast.success("Approved and verification email sent");
		} catch (error) {
			setLoading(false);
			toast.error(error.message);
			console.log(error);
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
			<AppDrawer page={"Pro Requests"}>
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
						Professionals Registration Requests
					</Typography>
					{/* {JSON.stringify(typeof requests, null, 4)} */}
					{Object.keys(requests).length > 0 ? (
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<ProRequests data={requests} handleAccept={handleAccept} />
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
							<Typography>No Professionals Requests</Typography>
						</Box>
					)}
				</Box>
			</AppDrawer>
		</div>
	);
};

export default NewProRequests;
