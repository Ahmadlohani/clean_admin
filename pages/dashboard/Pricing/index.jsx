import AppDrawer from "../../../components/AppDrawer/AppDrawer";
import {
	Box,
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import {
	collection,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const columns = [
	{ id: "suburb", label: "Suburb", minWidth: 300 },
	{ id: "action", label: "Action", minWidth: 200 },
];
const Pricing = () => {
	const route = useRouter();
	const [doneAreas, setDoneAreas] = useState([]);
	const [pendingAreas, setPendingAreas] = useState([]);
	const [loading, setLoading] = useState(false);
	const [mode, setMode] = useState("done");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const loaderImage = "/images/loader.gif";
	useEffect(() => {
		getAreas();
	}, []);
	const getAreas = async () => {
		const suburbs = query(collection(db, "Pricing"));
		onSnapshot(suburbs, (querySnapshot) => {
			setLoading(true);
			let items = [];
			let doneSubsArray = [];
			if (querySnapshot.size == 0) {
				setLoading(false);
				setDoneAreas([]);
			} else {
				querySnapshot.forEach((doc) => {
					items.push({
						suburbId: doc.id,
						suburb: doc.data().suburb,
					});
					doneSubsArray.push(doc.id);
				});
				setDoneAreas(items);
				setLoading(false);
			}
			checkPending(doneSubsArray);
		});
	};
	const checkPending = async (doneSubsArray) => {
		try {
			const users = query(
				collection(db, "Users"),
				where("role", "==", "customer"),
				orderBy("createdAt", "desc")
			);
			const querySnapshot = await getDocs(users);
			let pendingItems = [];
			querySnapshot.forEach((doc) => {
				if (doc.data().suburb && doc.data().suburbId) {
					const existArray = doneSubsArray.filter((item) => {
						if (item == doc.data().suburbId) {
							return true;
						}
					});
					if (Object.keys(existArray).length == 0) {
						if (Object.keys(pendingItems).length > 0) {
							pendingItems.forEach((item) => {
								if (item.suburbId != doc.data().suburbId) {
									pendingItems.push({
										suburb: doc.data().suburb,
										suburbId: doc.data().suburbId,
									});
								}
							});
						} else {
							pendingItems.push({
								suburb: doc.data().suburb,
								suburbId: doc.data().suburbId,
							});
						}
					}
				}
			});
			setPendingAreas(pendingItems);
		} catch (error) {
			console.log(error);
		}
	};
	function createData(suburb, action) {
		return { suburb, action };
	}
	const row =
		mode == "done"
			? doneAreas?.map((item) => createData(item.suburb, item.suburbId))
			: pendingAreas?.map((item) => createData(item.suburb, item.suburbId));
	const rows = row;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const handlefilterCities = (mode) => {
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
			<AppDrawer page={"Pricing"}>
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
							Pricing
						</Typography>
						<Box display={"flex"} alignItems={"center"} gap={1}>
							<Button
								variant={mode == "done" ? "contained" : "outlined"}
								color="success"
								onClick={() => handlefilterCities("done")}
							>
								Completed
							</Button>
							<Button
								variant={mode == "pending" ? "contained" : "outlined"}
								color="warning"
								onClick={() => handlefilterCities("pending")}
							>
								Pending
							</Button>
						</Box>
					</Box>
					{(mode == "done" && Object.keys(doneAreas).length > 0) ||
					(mode == "pending" && Object.keys(pendingAreas).length > 0) ? (
						<Grid container>
							<Grid item xs={12}>
								<Paper sx={{ width: "100%", overflow: "hidden" }}>
									<TableContainer sx={{ maxHeight: 440 }}>
										<Table stickyHeader aria-label="sticky table">
											<TableHead>
												<TableRow>
													{columns.map((column) => (
														<TableCell
															key={column.id}
															style={{
																minWidth: column.minWidth,
															}}
															sx={{
																backgroundColor: "#000000",
																color: "#ffffff",
															}}
														>
															{column.label}
														</TableCell>
													))}
												</TableRow>
											</TableHead>
											<TableBody>
												{rows
													.slice(
														page * rowsPerPage,
														page * rowsPerPage + rowsPerPage
													)
													.map((row, index) => {
														return (
															<TableRow
																hover
																role="checkbox"
																tabIndex={-1}
																key={index}
															>
																{columns.map((column) => {
																	const value = row[column.id];
																	return (
																		<TableCell key={column.id}>
																			{column.id === "action" ? (
																				<Button
																					variant="contained"
																					onClick={() =>
																						route.push(
																							`/dashboard/Pricing/SetPricing?suburbId=${value}&suburb=${row.suburb}`
																						)
																					}
																				>
																					{mode == "done"
																						? "Update Pricing"
																						: "Set Pricing"}
																				</Button>
																			) : (
																				value
																			)}
																		</TableCell>
																	);
																})}
															</TableRow>
														);
													})}
											</TableBody>
										</Table>
									</TableContainer>
									<TablePagination
										rowsPerPageOptions={[10, 25, 100]}
										component="div"
										count={rows.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
									/>
								</Paper>
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
							<Typography>No suburbs found</Typography>
						</Box>
					)}
				</Box>
			</AppDrawer>
		</div>
	);
};

export default Pricing;
