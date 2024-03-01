import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db, storage } from "../../../../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import BookingRequests from "../../../../components/Card/BookingRequests";
import {
	ArrowBack,
	CheckCircle,
	CloudUpload,
	Delete,
	PictureAsPdf,
	Upload,
	UploadFile,
} from "@mui/icons-material";
import styled from "styled-components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import BookingData from "../../../components/Card/BookingData";
const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});
const ViewDetail = () => {
	const route = useRouter();
	const { id } = route.query;
	const loaderImage = "/images/loader.gif";
	const [bookings, setBookings] = useState(null);
	const [profile, setProfile] = useState({
		key: "1",
		name: "John Doe",
		username: "John Doe",
		email: "email",
		phone: "phone",
		image: "",
		id: "",
		residence: "",
		workPermit: "",
		wallet: {},
	});
	const [idDoc, setIdDoc] = useState({
		file: null,
		name: "",
		size: "",
		uploadedUri: "",
	});
	const [residence, setResidence] = useState({
		file: null,
		name: "",
		size: "",
		uploadedUri: "",
	});
	const [workPermit, setWorkPermit] = useState({
		file: null,
		name: "",
		size: "",
		uploadedUri: "",
	});
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
				// setProfile({ key: docSnap.id, ...docSnap.data() });
				const {
					name,
					username,
					email,
					phone,
					image,
					id,
					residence,
					workPermit,
				} = docSnap.data();
				setProfile({
					...profile,
					name,
					username,
					email,
					phone,
					image,
					id,
					residence,
					workPermit,
					wallet: docSnap.data().wallet,
				});
				setLoading(false);
			} else {
				setLoading(false);
				route.push("/dashboard/professionals");
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
				where("selectedPro.proId", "==", id),
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
	const handleChange = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};
	const handleUpdate = async () => {
		try {
			if (profile.name == "" || profile.phone == "") {
				toast.error("Fields cannot be empty");
				return;
			}
			const docRef = doc(db, "Users", id);
			await updateDoc(docRef, {
				name: profile.name,
				phone: profile.phone,
			});
			setLoading(false);
			toast.success("User data updated");
		} catch (error) {
			setLoading(false);
			toast.error("Something went wrong");
			console.log(error);
		}
	};
	const handleReplace = (e, type) => {
		const file = e.target.files[0];
		if (file === undefined || file === null) {
			return;
		}
		const formData = new FormData();
		formData.append("document", file);
		const filedata = [...formData];
		const filename = filedata[0][1].name;
		const filesize = filedata[0][1].size;
		const extension = filename.split(".").pop();
		if (extension !== "pdf" && extension !== "PDF") {
			toast.error("Only PDF is allowed. Try to re-upload");
			return;
		}
		if (filesize > 2000000) {
			toast.error("File should be less than 2MB");
			return;
		}
		if (type == "id") {
			setIdDoc({
				...idDoc,
				file: file,
				name: filename,
				size: filesize,
			});
		}
		if (type == "residence") {
			setResidence({
				...residence,
				file: file,
				name: filename,
				size: filesize,
			});
		}
		if (type == "workPermit") {
			setWorkPermit({
				...workPermit,
				file: file,
				name: filename,
				size: filesize,
			});
		}
	};
	const handleUpload = async (typo) => {
		try {
			setLoading(true);
			const userRef = doc(db, "Users", id);
			const storageRef = ref(
				storage,
				`ProfileDocs/${profile.username}/${new Date().getTime()}`
			);
			if (typo == "id") {
				await uploadBytes(storageRef, idDoc.file);
				const url = await getDownloadURL(storageRef);
				await updateDoc(userRef, {
					id: url,
				});
				setIdDoc({
					...idDoc,
					file: null,
					name: "",
					size: "",
				});
				setProfile({ ...profile, id: url });
			}
			if (typo == "workPermit") {
				await uploadBytes(storageRef, workPermit.file);
				const url = await getDownloadURL(storageRef);
				await updateDoc(userRef, {
					workPermit: url,
				});
				setWorkPermit({
					...workPermit,
					file: null,
					name: "",
					size: "",
				});
				setProfile({ ...profile, workPermit: url });
			}
			if (typo == "residence") {
				await uploadBytes(storageRef, residence.file);
				const url = await getDownloadURL(storageRef);
				await updateDoc(userRef, {
					residence: url,
				});
				setResidence({
					...residence,
					file: null,
					name: "",
					size: "",
				});
				setProfile({ ...profile, residence: url });
			}
			setLoading(false);
			toast.success("Document Uploaded Successfully");
		} catch (error) {
			setLoading(false);
			toast.error("Error Uploading file");
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
							onClick={() => route.push("/dashboard/professionals")}
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
										<TextField
											label="Name"
											name="name"
											value={profile.name}
											variant="outlined"
											sx={{ my: 1, width: "95%" }}
											onChange={handleChange}
										/>
										<TextField
											label="Email"
											name="email"
											value={profile.email}
											onChange={handleChange}
											variant="outlined"
											disabled
											sx={{ mb: 1, width: "95%" }}
										/>
										<TextField
											label="Phone"
											name="phone"
											value={profile.phone}
											onChange={handleChange}
											variant="outlined"
											sx={{ mb: 1, width: "95%" }}
										/>
										<Button
											size="small"
											variant="contained"
											sx={{
												color: "white",
												backgroundColor: "green",
												my: 2,
												width: "95%",
												"&:hover": {
													backgroundColor: "green",
												},
											}}
											onClick={handleUpdate}
										>
											Update
										</Button>
										<Box>
											<Typography mb={2} fontSize={25} fontWeight={500}>
												Documents
											</Typography>
											<Box mx={1}>
												<Box
													display={"flex"}
													justifyContent={"space-between"}
													alignItems={"center"}
													flexWrap={"wrap"}
													mt={1}
												>
													<a href={profile.id} target="blank">
														<Button
															size="small"
															variant="contained"
															startIcon={<PictureAsPdf />}
															sx={{
																color: "red",
																backgroundColor: "#ffffff",
																"&:hover": {
																	backgroundColor: "#ffffff",
																},
															}}
														>
															ID
														</Button>
													</a>
													{idDoc.file && (
														<Box
															display={"flex"}
															alignItems={"center"}
															gap={2}
															my={1}
														>
															<Box>
																<Typography fontSize={14}>
																	{idDoc.name}
																</Typography>
																<Typography fontSize={13} color={"red"}>
																	{(idDoc.size / 1000000).toFixed(2)}MB
																</Typography>
															</Box>
															<Delete
																sx={{ color: "red", fontSize: 20 }}
																onClick={() =>
																	setIdDoc({
																		...idDoc,
																		file: null,
																		name: "",
																		size: "",
																	})
																}
															/>
															<CloudUpload
																onClick={() => handleUpload("id")}
																sx={{ color: "green", cursor: "pointer" }}
															/>
														</Box>
													)}
													<label
														style={{
															fontWeight: 500,
															fontSize: "0.8125rem",
															lineHeight: 1.75,
															letterSpacing: "0.02857em",
															textTransform: "uppercase",
															padding: "4px 10px",
															borderRadius: 4,
															backgroundColor: "#ffffff",
															color: "red",
															minWidth: 64,
															cursor: "pointer",
															boxShadow:
																"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
														}}
													>
														Replace
														<input
															onChange={(e) => handleReplace(e, "id")}
															type="file"
															accept="application/pdf"
															hidden
														/>
													</label>
												</Box>
												<Box
													display={"flex"}
													justifyContent={"space-between"}
													alignItems={"center"}
													flexWrap={"wrap"}
													mt={1}
												>
													<a href={profile.residence} target="blank">
														<Button
															size="small"
															variant="contained"
															startIcon={<PictureAsPdf />}
															sx={{
																color: "red",
																backgroundColor: "#ffffff",
																"&:hover": {
																	backgroundColor: "#ffffff",
																},
															}}
														>
															Residence
														</Button>
													</a>
													{residence.file && (
														<Box
															display={"flex"}
															alignItems={"center"}
															gap={2}
															my={1}
														>
															<Box>
																<Typography fontSize={14}>
																	{residence.name}
																</Typography>
																<Typography fontSize={13} color={"red"}>
																	{(residence.size / 1000000).toFixed(2)}MB
																</Typography>
															</Box>
															<Delete
																sx={{ color: "red", fontSize: 20 }}
																onClick={() =>
																	setResidence({
																		...residence,
																		file: null,
																		name: "",
																		size: "",
																	})
																}
															/>
															<CloudUpload
																onClick={() => handleUpload("residence")}
																sx={{ color: "green", cursor: "pointer" }}
															/>
														</Box>
													)}
													<label
														style={{
															fontWeight: 500,
															fontSize: "0.8125rem",
															lineHeight: 1.75,
															letterSpacing: "0.02857em",
															textTransform: "uppercase",
															padding: "4px 10px",
															borderRadius: 4,
															backgroundColor: "#ffffff",
															color: "red",
															cursor: "pointer",
															minWidth: 64,
															boxShadow:
																"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
														}}
													>
														Replace
														<input
															onChange={(e) => handleReplace(e, "residence")}
															type="file"
															accept="application/pdf"
															hidden
														/>
													</label>
												</Box>
												<Box
													display={"flex"}
													justifyContent={"space-between"}
													alignItems={"center"}
													flexWrap={"wrap"}
													my={1}
												>
													<a href={profile.workPermit} target="blank">
														<Button
															size="small"
															variant="contained"
															startIcon={<PictureAsPdf />}
															sx={{
																color: "red",
																backgroundColor: "#ffffff",
																"&:hover": {
																	backgroundColor: "#ffffff",
																},
															}}
														>
															Work Permit
														</Button>
													</a>
													{workPermit.file && (
														<Box
															display={"flex"}
															alignItems={"center"}
															gap={2}
															my={1}
														>
															<Box>
																<Typography fontSize={14}>
																	{workPermit.name}
																</Typography>
																<Typography fontSize={13} color={"red"}>
																	{(workPermit.size / 1000000).toFixed(2)}MB
																</Typography>
															</Box>
															<Delete
																sx={{ color: "red", fontSize: 20 }}
																onClick={() =>
																	setWorkPermit({
																		...workPermit,
																		file: null,
																		name: "",
																		size: "",
																	})
																}
															/>
															<CloudUpload
																onClick={() => handleUpload("workPermit")}
																sx={{ color: "green", cursor: "pointer" }}
															/>
														</Box>
													)}
													<label
														style={{
															fontWeight: 500,
															fontSize: "0.8125rem",
															lineHeight: 1.75,
															letterSpacing: "0.02857em",
															textTransform: "uppercase",
															padding: "4px 10px",
															borderRadius: 4,
															backgroundColor: "#ffffff",
															color: "red",
															minWidth: 64,
															cursor: "pointer",
															boxShadow:
																"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
														}}
													>
														Replace
														<input
															onChange={(e) => handleReplace(e, "workPermit")}
															type="file"
															accept="application/pdf"
															hidden
														/>
													</label>
												</Box>
											</Box>
										</Box>
										{profile.wallet && (
											<Box bgcolor={"yellow"}>
												<Box
													display={"flex"}
													justifyContent={"space-between"}
													alignItems={"center"}
													flexWrap={"wrap"}
													mx={1}
												>
													<Typography
														mb={2}
														my={1}
														fontSize={25}
														fontWeight={500}
														color={"red"}
													>
														Wallet
													</Typography>
													<Button
														size="small"
														variant="contained"
														color="warning"
														onClick={() =>
															route.push(
																`/dashboard/Accounts/AccountDetail/${id}`
															)
														}
													>
														Edit Wallet
													</Button>
												</Box>
												<Box
													display={"flex"}
													justifyContent={"space-between"}
													alignItems={"center"}
													flexWrap={"wrap"}
													mx={1}
												>
													<Typography mb={2} fontSize={14} fontWeight={500}>
														Total Earned: {profile.wallet.totalEarned}
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
														Got Paid: {profile.wallet.gotPaid}
													</Typography>
													<Typography mb={2} fontSize={14} fontWeight={500}>
														App Commission: {profile.wallet.payToApp}
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
