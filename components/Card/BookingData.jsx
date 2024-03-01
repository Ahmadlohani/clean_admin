import * as React from "react";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";

export default function BookingData({ data }) {
	const route = useRouter();
	let booking = {};
	if (Object.keys(data).length > 0) {
		booking = data[0];
	} else {
		booking = null;
	}
	return (
		<Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 1 }}>
			{booking && (
				<Box>
					<Box bgcolor={"yellow"} borderRadius={1} padding={2}>
						<Grid container>
							<Grid item xs={12} sm={5} display={"flex"} alignItems={"center"}>
								<Button
									variant="contained"
									color="error"
									onClick={() => route.push("/dashboard/Bookings")}
									startIcon={<ArrowBack />}
								>
									Back to Bookings
								</Button>
							</Grid>
							<Grid item xs={12} sm={7} display={"flex"} alignItems={"center"}>
								<Typography
									variant={"h6"}
									textAlign={"left"}
									fontWeight={"bold"}
									sx={{
										textAlign: {
											xs: "center",
											sm: "left",
										},
										width: "100%",
										ml: 2,
									}}
								>
									Booking Details
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
							mt={2}
						>
							<Grid item xs={12} sm={6}>
								<Box
									display={"flex"}
									alignItems={"center"}
									sx={{
										justifyContent: {
											xs: "center",
											sm: "flex-start",
										},
									}}
								>
									<Typography fontSize={16} fontWeight={"bold"}>
										Customer Name:{" "}
									</Typography>
									<Typography fontSize={16} fontWeight={"400"} color={"gray"}>
										{booking.customerName ? booking.customerName : "John Doe"}
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Box
									display={"flex"}
									alignItems={"center"}
									sx={{
										justifyContent: {
											xs: "center",
											sm: "flex-end",
										},
									}}
								>
									<Typography fontSize={16} fontWeight={"bold"}>
										Status:{" "}
									</Typography>
									<Typography fontSize={16} fontWeight={"400"} color={"gray"}>
										{booking.status}
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Box>
					<Box>
						{booking.payData && (
							<>
								<Typography
									variant={"h6"}
									textAlign={"center"}
									fontWeight={"bold"}
									my={3}
									color={"#d32f2f"}
								>
									Payment Detail
								</Typography>
								<Grid
									container
									pl={2}
									pr={2}
									display={"flex"}
									justifyContent={"center"}
									alignItems={"center"}
								>
									<Grid item xs={12} sm={4}>
										<Box
											display={"flex"}
											alignItems={"center"}
											gap={1}
											sx={{
												justifyContent: {
													xs: "center",
													sm: "flex-start",
												},
											}}
										>
											<Typography fontSize={16} fontWeight={"bold"}>
												Cost:{" "}
											</Typography>
											<Typography
												fontSize={16}
												fontWeight={"400"}
												color={"gray"}
											>
												R{booking.cost}
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Box
											display={"flex"}
											alignItems={"center"}
											gap={1}
											justifyContent={"center"}
										>
											<Typography fontSize={16} fontWeight={"bold"}>
												Commission:{" "}
											</Typography>
											<Typography
												fontSize={16}
												fontWeight={"400"}
												color={"gray"}
											>
												R{booking.commission}
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={12} sm={4}>
										<Box
											display={"flex"}
											alignItems={"center"}
											gap={1}
											sx={{
												justifyContent: {
													xs: "center",
													sm: "flex-end",
												},
											}}
										>
											<Typography fontSize={16} fontWeight={"bold"}>
												Choice:{" "}
											</Typography>
											<Typography
												fontSize={16}
												fontWeight={"400"}
												color={"gray"}
											>
												{booking.payData.choice}
											</Typography>
										</Box>
									</Grid>
								</Grid>
								<Grid
									container
									pl={2}
									pr={2}
									display={"flex"}
									alignItems={"center"}
									justifyContent={"center"}
									mt={2}
								>
									<Grid item xs={12} sm={6}>
										<Box
											display={"flex"}
											alignItems={"center"}
											gap={1}
											sx={{
												justifyContent: {
													xs: "center",
													sm: "flex-start",
												},
											}}
										>
											<Typography fontSize={16} fontWeight={"bold"}>
												Discounted Amount:{" "}
											</Typography>
											<Typography
												fontSize={16}
												fontWeight={"400"}
												color={"gray"}
											>
												R{booking.payData.discountedAmount}
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Box
											display={"flex"}
											alignItems={"center"}
											gap={1}
											sx={{
												justifyContent: {
													xs: "center",
													sm: "flex-end",
												},
											}}
										>
											<Typography fontSize={16} fontWeight={"bold"}>
												Applied Promo:{" "}
											</Typography>
											<Typography
												fontSize={16}
												fontWeight={"400"}
												color={"gray"}
											>
												{booking.payData.appliedPromo == ""
													? "No Promo Applied"
													: booking.payData.appliedPromo}
											</Typography>
										</Box>
									</Grid>
								</Grid>
							</>
						)}
						{booking.status != "requested" && (
							<>
								<Typography
									variant={"h6"}
									textAlign={"center"}
									fontWeight={"bold"}
									my={3}
									color={"#d32f2f"}
								>
									Professional
								</Typography>
								<Grid
									container
									pl={2}
									pr={2}
									display={"flex"}
									alignItems={"center"}
									justifyContent={"center"}
								>
									<Grid item xs={12} sm={6}>
										<Box
											display={"flex"}
											alignItems={"center"}
											gap={1}
											sx={{
												justifyContent: {
													xs: "center",
													sm: "flex-start",
												},
											}}
										>
											<Typography fontSize={16} fontWeight={"bold"}>
												Name:{" "}
											</Typography>
											<Typography
												fontSize={16}
												fontWeight={"400"}
												color={"gray"}
											>
												{booking.selectedPro.proName}
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Box
											display={"flex"}
											alignItems={"center"}
											gap={1}
											sx={{
												justifyContent: {
													xs: "center",
													sm: "flex-end",
												},
											}}
										>
											<Typography fontSize={16} fontWeight={"bold"}>
												Phone:{" "}
											</Typography>
											<Typography
												fontSize={16}
												fontWeight={"400"}
												color={"gray"}
											>
												+27-{booking.selectedPro.proPhone}
											</Typography>
										</Box>
									</Grid>
								</Grid>
							</>
						)}
						<Typography
							variant={"h6"}
							textAlign={"center"}
							fontWeight={"bold"}
							my={3}
							color={"#d32f2f"}
						>
							Booking Items
						</Typography>
						<Grid
							container
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
							pl={2}
							pr={2}
						>
							<Grid item xs={12} sm={6}>
								<Box
									display={"flex"}
									alignItems={"center"}
									gap={1}
									sx={{
										justifyContent: {
											xs: "center",
											sm: "flex-start",
										},
									}}
								>
									<Typography fontSize={16} fontWeight={"bold"}>
										Bedrooms:{" "}
									</Typography>
									<Typography fontSize={16} fontWeight={"400"} color={"gray"}>
										{booking.details.bedrooms}
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Box
									display={"flex"}
									alignItems={"center"}
									gap={1}
									sx={{
										justifyContent: {
											xs: "center",
											sm: "flex-end",
										},
									}}
								>
									<Typography fontSize={16} fontWeight={"bold"}>
										Bathrooms:{" "}
									</Typography>
									<Typography fontSize={16} fontWeight={"400"} color={"gray"}>
										{booking.details.bathrooms}
									</Typography>
								</Box>
							</Grid>
						</Grid>
						<Grid
							container
							display={"flex"}
							alignItems={"center"}
							justifyContent={"space-between"}
							pl={2}
							pr={2}
						>
							<Grid item xs={12} sm={6}>
								<Box
									display={"flex"}
									alignItems={"center"}
									gap={1}
									sx={{
										justifyContent: {
											xs: "center",
											sm: "flex-start",
										},
									}}
								>
									<Typography fontSize={16} fontWeight={"bold"}>
										Extras:{" "}
									</Typography>
									{booking.extras.length > 0 ? (
										<Typography fontSize={16} fontWeight={"400"} color={"gray"}>
											{booking.extras.map((extra) => extra + " ")}
										</Typography>
									) : (
										<Typography fontSize={16} fontWeight={"400"} color={"gray"}>
											No Extras
										</Typography>
									)}
								</Box>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Box
									display={"flex"}
									alignItems={"center"}
									gap={1}
									sx={{
										justifyContent: {
											xs: "center",
											sm: "flex-end",
										},
									}}
								>
									<Typography fontSize={16} fontWeight={"bold"}>
										Address:{" "}
									</Typography>
									<Typography fontSize={16} fontWeight={"400"} color={"gray"}>
										{booking.location.address}
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Box>
					<Grid
						container
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						bgcolor={"lightgray"}
						mt={2}
						paddingY={2}
						pl={2}
						pr={2}
					>
						<Grid item xs={12} sm={4}>
							<Box
								display={"flex"}
								alignItems={"center"}
								gap={1}
								sx={{
									justifyContent: {
										xs: "center",
										sm: "flex-start",
									},
								}}
							>
								<Typography fontSize={16} fontWeight={"bold"}>
									Cleaning Date:{" "}
								</Typography>
								<Typography fontSize={16} fontWeight={"400"} color={"gray"}>
									{moment(booking.date).format("MMMM Do YYYY")}
								</Typography>
							</Box>
						</Grid>
						{booking.delayDate && (
							<Grid item xs={12} sm={4}>
								<Box
									display={"flex"}
									alignItems={"center"}
									gap={1}
									justifyContent={"center"}
								>
									<Typography fontSize={16} fontWeight={"bold"}>
										Delayed Date:{" "}
									</Typography>
									<Typography fontSize={16} fontWeight={"400"} color={"gray"}>
										{moment(booking.delayDate.seconds * 1000).format(
											"MMMM Do YYYY"
										)}
									</Typography>
								</Box>
							</Grid>
						)}
						<Grid item xs={12} sm={4}>
							<Box
								display={"flex"}
								alignItems={"center"}
								gap={1}
								sx={{
									justifyContent: {
										xs: "center",
										sm: "flex-end",
									},
								}}
							>
								<Typography fontSize={16} fontWeight={"bold"}>
									Created Date:{" "}
								</Typography>
								<Typography fontSize={16} fontWeight={"400"} color={"gray"}>
									{moment(booking.createdAt.seconds * 1000).format(
										"MMMM Do YYYY"
									)}
								</Typography>
							</Box>
						</Grid>
					</Grid>
					{/* <p>{JSON.stringify(data, null, 4)}</p> */}
				</Box>
			)}
		</Paper>
	);
}
