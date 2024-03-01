import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Box, Button } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useRouter } from "next/router";

const columns = [
	{ id: "image", label: "Image", minWidth: 170 },
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "email", label: "Email", minWidth: 200 },
	{ id: "phone", label: "Phone", minWidth: 200 },
	{ id: "status", label: "Status", minWidth: 200 },
	{ id: "action", label: "Action", minWidth: 200 },
];

export default function Customers({
	data,
	handleSuspend,
	handleActivate,
	handleDelete,
}) {
	const route = useRouter();
	function createData(image, name, email, phone, status, action) {
		return { image, name, email, phone, status, action };
	}
	const row = data?.map((item) =>
		createData(
			item.image,
			item.name,
			item.email,
			item.phone,
			item.suspended ? "suspended" : "working",
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
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.action}
									>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id}>
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
													) : column.id === "action" ? (
														<Box display={"flex"} gap={1}>
															<Button
																variant="contained"
																color="primary"
																size="small"
																sx={{ textTransform: "none" }}
																onClick={() =>
																	route.push(
																		"/dashboard/customers/ViewDetail/" + value
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
