import AppDrawer from "../../../components/AppDrawer/AppDrawer";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import BookingRequests from "../../../components/Card/BookingRequests";

const Bookings = () => {
	const [bookings, setBookings] = useState(null);
	const [filteredBookings, setFilteredBookings] = useState(null);
	const [loading, setLoading] = useState(false);
	const [mode, setMode] = useState("all");
	const loaderImage = "/images/loader.gif";

	useEffect(() => {
		getBookings();
	}, []);
	const getBookings = async () => {
		const bookings = query(
			collection(db, "Bookings"),
			orderBy("createdAt", "desc")
		);
		setLoading(true);
		onSnapshot(bookings, (querySnapshot) => {
			let items = [];
			if (querySnapshot.size == 0) {
				setLoading(false);
				setBookings(null);
				setFilteredBookings(null);
			} else {
				setLoading(false);
				querySnapshot.forEach((doc) => {
					items.push({ key: doc.id, ...doc.data() });
				});
			}
			setMode("all");
			setBookings(items);
			setFilteredBookings(items);
		});
	};
	const handlefilterBookings = (mode) => {
		setLoading(true);
		let filter;
		let filteredArray = [...bookings];
		setMode(mode);
		if (mode == "all") {
			setFilteredBookings(bookings);
		}
		if (mode == "pending") {
			filter = filteredArray.filter(
				(item) => item.status != "done" && item.status != "cancelled"
			);
			setFilteredBookings(filter);
		}
		if (mode == "done" || mode == "cancelled") {
			filter = filteredArray.filter((item) => item.status == mode);
			setFilteredBookings(filter);
		}
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
			<AppDrawer page={"Bookings"}>
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
							Bookings
						</Typography>
						<Box display={"flex"} alignItems={"center"} gap={1}>
							<Button
								variant={mode == "all" ? "contained" : "outlined"}
								color="warning"
								onClick={() => handlefilterBookings("all")}
							>
								All
							</Button>
							<Button
								variant={mode == "done" ? "contained" : "outlined"}
								color="success"
								onClick={() => handlefilterBookings("done")}
							>
								Completed
							</Button>
							<Button
								variant={mode == "pending" ? "contained" : "outlined"}
								color="secondary"
								onClick={() => handlefilterBookings("pending")}
							>
								Pending
							</Button>
							<Button
								variant={mode == "cancelled" ? "contained" : "outlined"}
								color="error"
								onClick={() => handlefilterBookings("cancelled")}
							>
								Cancelled
							</Button>
						</Box>
					</Box>
					{filteredBookings ? (
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<BookingRequests data={filteredBookings} />
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
							<Typography>No Bookings yet</Typography>
						</Box>
					)}
				</Box>
			</AppDrawer>
		</div>
	);
};

export default Bookings;
