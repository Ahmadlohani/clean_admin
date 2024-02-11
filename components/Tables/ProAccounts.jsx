import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Link from "next/link";

const columns = [
	{ id: "name", label: "Name", minWidth: 150 },
	{ id: "totalEarned", label: "Total Earned", minWidth: 150 },
	{ id: "totalPenalty", label: "Total Penalty", minWidth: 170 },
	{ id: "penaltyPaid", label: "Penalty Paid", minWidth: 200 },
	{ id: "gotPaid", label: "Got Paid", minWidth: 150 },
	{ id: "payToApp", label: "Pay To App", minWidth: 200 },
	{ id: "action", label: "Action", minWidth: 200 },
];

export default function ProAccounts({ data }) {
	function createData(
		name,
		totalEarned,
		totalPenalty,
		penaltyPaid,
		gotPaid,
		payToApp,
		action
	) {
		return {
			name,
			totalEarned,
			totalPenalty,
			penaltyPaid,
			gotPaid,
			payToApp,
			action,
		};
	}
	const row =
		data &&
		data?.map((item) =>
			createData(
				item.name,
				item.wallet.totalEarned,
				item.wallet.totalPenalty,
				item.wallet.penaltyPaid,
				item.wallet.gotPaid,
				item.wallet.payToApp,
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
													{column.id === "name" ? (
														value
													) : column.id === "action" ? (
														<Link href={`/dashboard/BookingDetail/${value}`}>
															<Button
																variant="contained"
																style={{
																	color: "#fff",
																	backgroundColor: "#000",
																}}
															>
																Pay
															</Button>
														</Link>
													) : (
														"R" + value
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
