import * as React from "react";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
const CustomerWallet = ({ data }) => {
	const route = useRouter();
	const [detail, setDetail] = React.useState({
		totalSpent: data.totalSpent,
		totalPenalty: data.totalPenalty,
		penaltyPaid: data.penaltyPaid,
		refundAmount: data.refundAmount,
		refundAmountReceived: data.refundAmountReceived,
	});
	const handleSubmit = async () => {
		try {
			const docRef = doc(db, "Users", data.key);
			await updateDoc(docRef, {
				wallet: {
					totalSpent: detail.totalSpent,
					totalPenalty: detail.totalPenalty,
					penaltyPaid: detail.penaltyPaid,
					refundAmount: detail.refundAmount,
					refundAmountReceived: detail.refundAmountReceived,
				},
			});
			toast.success("Account updated successfully");
			route.push("/dashboard/Accounts");
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		}
	};
	return (
		<Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 1 }}>
			{data && (
				<Box>
					<Box bgcolor={"yellow"} borderRadius={1} padding={2}>
						<Grid container>
							<Grid item xs={12} sm={5} display={"flex"} alignItems={"center"}>
								<Button
									variant="contained"
									color="error"
									onClick={() => route.push("/dashboard/Accounts")}
									startIcon={<ArrowBack />}
								>
									Back to Accounts
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
									Account Details
								</Typography>
							</Grid>
						</Grid>
					</Box>
					<Grid
						container
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						mt={2}
						bgcolor={"lightgray"}
					>
						<Grid item xs={12} sm={12} ml={2} mr={2} pt={2}>
							<TextField
								id="outlined-basic"
								label="Total Spent *"
								variant="outlined"
								fullWidth
								sx={{ my: 1 }}
								inputProps={{ type: "number" }}
								value={detail.totalSpent}
								onChange={(e) =>
									setDetail({ ...detail, totalSpent: e.target.value })
								}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						bgcolor={"lightgray"}
						paddingY={2}
						pl={2}
						pr={2}
						spacing={2}
					>
						<Grid item xs={12} sm={6}>
							<TextField
								id="outlined-basic"
								label="Total Penalty *"
								variant="outlined"
								fullWidth
								sx={{ my: 1 }}
								inputProps={{ type: "number" }}
								value={detail.totalPenalty}
								onChange={(e) =>
									setDetail({ ...detail, totalPenalty: e.target.value })
								}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="outlined-basic"
								label="Penalty Paid *"
								variant="outlined"
								fullWidth
								sx={{ my: 1 }}
								inputProps={{ type: "number" }}
								value={detail.penaltyPaid}
								onChange={(e) =>
									setDetail({ ...detail, penaltyPaid: e.target.value })
								}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						bgcolor={"lightgray"}
						paddingY={2}
						pl={2}
						pr={2}
						spacing={2}
					>
						<Grid item xs={12} sm={6}>
							<TextField
								id="outlined-basic"
								label="Refund Amount *"
								variant="outlined"
								fullWidth
								sx={{ my: 1 }}
								inputProps={{ type: "number" }}
								value={detail.refundAmount}
								onChange={(e) =>
									setDetail({ ...detail, refundAmount: e.target.value })
								}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="outlined-basic"
								label="Refund Amount Received *"
								variant="outlined"
								fullWidth
								inputProps={{ type: "number" }}
								sx={{ my: 1 }}
								value={detail.refundAmountReceived}
								onChange={(e) =>
									setDetail({ ...detail, refundAmountReceived: e.target.value })
								}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						mt={2}
						bgcolor={"gray"}
					>
						<Grid item xs={12} sm={6}>
							<Box
								display={"flex"}
								alignItems={"center"}
								gap={1}
								justifyContent={"center"}
								py={1}
							>
								<Button
									variant="contained"
									color="error"
									onClick={() => route.push("/dashboard/Accounts")}
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={handleSubmit}
								>
									Update
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Box>
			)}
		</Paper>
	);
};

export default CustomerWallet;
