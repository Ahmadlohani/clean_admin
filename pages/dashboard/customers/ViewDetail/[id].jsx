import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import BookingRequests from "../../../../components/Card/BookingRequests";
import { ArrowBack } from "@mui/icons-material";
// import BookingData from "../../../components/Card/BookingData";

const ViewDetail = () => {
	const route = useRouter();
	const { id } = route.query;
	const loaderImage = "/images/loader.gif";
	const [bookings, setBookings] = useState(null);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [mode, setMode] = useState("profile");
	useEffect(() => {
		if (id) {
			getProfile();
		}
	}, [id]);
	const getProfile = async () => {
		try {
			setLoading(true);
			setMode("profile");
			const docRef = doc(db, "Users", id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setProfile({ key: docSnap.id, ...docSnap.data() });
				setLoading(false);
			} else {
				setLoading(false);
				route.push("/dashboard/customers");
			}
		} catch (error) {
			setLoading(false);
			toast.error("Error fetching profile");
			console.log(error);
		}
	};
	const getBooking = async () => {
		try {
			setLoading(true);
			setMode("booking");
			const booking = query(
				collection(db, "Bookings"),
				where("uid", "==", id),
				orderBy("createdAt", "desc")
			);
			const querySnapshot = await getDocs(booking);
			let items = [];
			if (querySnapshot.size > 0) {
				querySnapshot.forEach((docSnap) => {
					items.push({ key: docSnap.id, ...docSnap.data() });
				});
				setBookings(items);
				setLoading(false);
			} else {
				setLoading(false);
				setBookings(null);
			}
		} catch (error) {
			setLoading(false);
			toast.error("Error fetching booking");
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
			<Box sx={{ flexGrow: 1 }}>
				<Grid
					container
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Grid
						item
						xs={12}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						gap={2}
						mt={2}
						mb={3}
						bgcolor={"#f4f4f4"}
						p={2}
					>
						<Button
							variant={"text"}
							color="error"
							size="large"
							sx={{ textTransform: "none" }}
							startIcon={<ArrowBack />}
							onClick={() => route.push("/dashboard/customers")}
						>
							Back
						</Button>
						<Button
							variant={mode === "profile" ? "contained" : "outlined"}
							color="primary"
							size="large"
							sx={{ textTransform: "none", width: 150 }}
							onClick={getProfile}
						>
							Profile
						</Button>
						<Button
							variant={mode === "booking" ? "contained" : "outlined"}
							color="secondary"
							size="large"
							sx={{ textTransform: "none", width: 150 }}
							onClick={getBooking}
						>
							Bookings
						</Button>
					</Grid>
				</Grid>
				{(mode == "profile" && profile) || (mode == "booking" && bookings) ? (
					<Container
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							marginY: 2,
						}}
					>
						{mode == "profile" ? (
							<Grid
								container
								display={"flex"}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<Grid item xs={12}>
									{/* <BookingData data={booking} /> */}
									{/* {JSON.stringify(profile, null, 4)} */}
									<Box className="profileCard">
										<Box
											display={"flex"}
											justifyContent={"center"}
											alignItems={"center"}
											bgcolor={"#f4f4f4"}
											p={2}
										>
											<Avatar
												alt="ProfileImage"
												sx={{
													width: 100,
													height: 100,
													marginBottom: 2,
													alignSelf: "center",
												}}
												src={
													profile.image ? profile.image : "/images/favicon.png"
												}
											/>
										</Box>
										<Typography my={1} fontSize={30} fontWeight={500}>
											{profile.name}
										</Typography>
										<Typography className="profileTitle">
											{profile.email}
										</Typography>
										<br />
										<Typography mb={2}>Phone: +27-{profile.phone}</Typography>
										{profile.wallet && (
											<Box bgcolor={"yellow"}>
												<Typography
													mb={2}
													my={1}
													fontSize={25}
													fontWeight={500}
													color={"red"}
												>
													Wallet
												</Typography>
												<Box
													display={"flex"}
													justifyContent={"space-between"}
													alignItems={"center"}
													flexWrap={"wrap"}
													mx={1}
												>
													<Typography mb={2} fontSize={14} fontWeight={500}>
														Total Spent: {profile.wallet.totalSpent}
													</Typography>
													<Typography mb={2} fontSize={14} fontWeight={500}>
														Total Penalty: {profile.wallet.totalPenalty}
													</Typography>
												</Box>
												<Box
													display={"flex"}
													justifyContent={"space-between"}
													alignItems={"center"}
													flexWrap={"wrap"}
													mx={1}
												>
													<Typography mb={2} fontSize={14} fontWeight={500}>
														Penalty Paid: {profile.wallet.penaltyPaid}
													</Typography>
													<Typography mb={2} fontSize={14} fontWeight={500}>
														Refund Amount: {profile.wallet.refundAmount}
													</Typography>
													<Typography mb={2} fontSize={14} fontWeight={500}>
														Refund Amount Received:{" "}
														{profile.wallet.refundAmountReceived}
													</Typography>
												</Box>
											</Box>
										)}
									</Box>
								</Grid>
							</Grid>
						) : (
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<BookingRequests data={bookings} />
								</Grid>
							</Grid>
						)}
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
						<Typography>No Data Found</Typography>
					</Box>
				)}
			</Box>
		</div>
	);
};

export default ViewDetail;
