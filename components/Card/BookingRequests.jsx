import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { CheckCircle, Person, PictureAsPdf } from "@mui/icons-material";
import Link from "next/link";

const columns = [
	{ id: "customer_name", label: "Customer Name", minWidth: 150 },
	{ id: "address", label: "Address", minWidth: 170 },
	{ id: "date", label: "Cleaning Date", minWidth: 200 },
	{ id: "status", label: "Status", minWidth: 150 },
	{ id: "cost", label: "Total Cost", minWidth: 200 },
	{ id: "action", label: "Action", minWidth: 200 },
];

export default function BookingRequests({ data }) {
	function createData(customer_name, address, date, status, cost, action) {
		return {
			customer_name,
			address,
			date,
			status,
			cost,
			action,
		};
	}
	const row =
		data &&
		data?.map((item) =>
			createData(
				item.customer_name ? item.customer_name : "John Doe",
				item.location.address,
				item.date,
				item.status,
				item.totalCost ? item.totalCost : 0,
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
							.map((row, i) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={i}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id}>
													{column.id === "date" ? (
														value.toString()
													) : column.id === "cost" ? (
														"R" + value
													) : column.id === "action" ? (
														<Link href={`/dashboard/BookingDetail/${value}`}>
															<Button
																variant="contained"
																style={{
																	color: "#fff",
																	backgroundColor: "#000",
																}}
															>
																Details
															</Button>
														</Link>
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
