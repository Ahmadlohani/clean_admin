import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { CheckCircle, Person, PictureAsPdf } from "@mui/icons-material";
import { useRouter } from "next/router";

const columns = [
	{ id: "image", label: "Image", minWidth: 100 },
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "email", label: "Email", minWidth: 200 },
	{ id: "phone", label: "Phone", minWidth: 140 },
	{ id: "docs", label: "Docs", minWidth: 150 },
	{ id: "status", label: "Status", minWidth: 100 },
	{ id: "action", label: "Action", minWidth: 100 },
];

export default function Professional({
	data,
	handleSuspend,
	handleActivate,
	handleDelete,
}) {
	const route = useRouter();
	function createData(
		image,
		status,
		name,
		email,
		phone,
		residence,
		id,
		workPermit,
		action
	) {
		return {
			image,
			status,
			name,
			email,
			phone,
			docs: { residence, id, workPermit },
			action,
		};
	}
	const row = data?.map((item) =>
		createData(
			item.image,
			item.status,
			item.name,
			item.email,
			item.phone,
			item.residence,
			item.id,
			item.workPermit,
			item.key
		)
	);
	const rows = row;
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									style={{ minWidth: column.minWidth }}
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
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.id === "image" ? (
														value === "" ? (
															<Avatar>
																<Person />
															</Avatar>
														) : (
															<Avatar alt="profile" src={value} />
														)
													) : column.id === "phone" ? (
														"+27-" + value
													) : column.id === "docs" ? (
														<Box
															display={"flex"}
															flexDirection={"column"}
															gap={1}
														>
															<a href={value.id} target="blank">
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
															<a href={value.residence} target="blank">
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
															<a href={value.workPermit} target="blank">
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
														</Box>
													) : column.id === "status" ? (
														value === "suspended" ? (
															<Typography color={"red"} variant="p">
																suspended
															</Typography>
														) : value === "requested" ? (
															<Typography color={"red"} variant="p">
																unverified
															</Typography>
														) : (
															<Typography color={"green"} variant="p">
																verified
															</Typography>
														)
													) : column.id === "action" ? (
														<Box display={"flex"} gap={1}>
															<Button
																variant="contained"
																color="primary"
																size="small"
																sx={{ textTransform: "none" }}
																onClick={() =>
																	route.push(
																		"/dashboard/professionals/ViewDetail/" +
																			value
																	)
																}
															>
																View
															</Button>
															{row.status === "suspended" ? (
																<Button
																	variant="contained"
																	color="success"
																	size="small"
																	sx={{ textTransform: "none" }}
																	onClick={() => handleActivate(value)}
																>
																	Activate
																</Button>
															) : (
																<Button
																	variant="contained"
																	color="warning"
																	size="small"
																	sx={{ textTransform: "none" }}
																	onClick={() => handleSuspend(value)}
																>
																	Suspend
																</Button>
															)}
															<Button
																variant="contained"
																color="error"
																size="small"
																sx={{ textTransform: "none" }}
																onClick={() => handleDelete(value)}
															>
																Delete
															</Button>
														</Box>
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
	);
}
