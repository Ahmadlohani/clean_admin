import { Box, Container, Grid, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookingData from "../../../components/Card/BookingData";

const BookingDetail = () => {
	const route = useRouter();
	const { id } = route.query;
	const loaderImage = "/images/loader.gif";
	const [booking, setBooking] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (id) {
			getBooking();
		}
	}, [id]);
	const getBooking = async () => {
		setLoading(true);
		const docRef = doc(db, "Bookings", id);
		const docSnap = await getDoc(docRef);
		let items = [];
		if (docSnap.exists()) {
			items.push({ key: docSnap.id, ...docSnap.data() });
			setBooking(items);
			setLoading(false);
		} else {
			setLoading(false);
			route.push("/dashboard/Bookings");
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
				{booking ? (
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
								<BookingData data={booking} />
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
						<Typography>No Booking Data</Typography>
					</Box>
				)}
			</Box>
		</div>
	);
};

export default BookingDetail;
