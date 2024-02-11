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
import moment from "moment";

const columns = [
	{ id: "suburb", label: "Suburb", minWidth: 170 },
	{ id: "promo", label: "Promo", minWidth: 170 },
	{ id: "promoVal", label: "Promo Value", minWidth: 200 },
	{ id: "expiry", label: "Expiry", minWidth: 200 },
	{ id: "action", label: "Action", minWidth: 200 },
];

export default function PromoList({ data, handlePromoEnd }) {
	function createData(suburb, promo, promoVal, expiry, action) {
		return { suburb, promo, promoVal, expiry, action };
	}
	const row = data?.map((item) =>
		createData(
			item.suburb,
			item.promo.promo,
			item.promo.promoValue,
			item.promo.promoDate.seconds,
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
													{column.id === "expiry" ? (
														moment(value * 1000).format("DD/MM/YYYY")
													) : column.id === "action" ? (
														<Button
															variant="contained"
															color="error"
															onClick={() => handlePromoEnd(value)}
														>
															End Promo
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
	);
}
