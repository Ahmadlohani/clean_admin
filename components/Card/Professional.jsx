import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Button, Typography } from "@mui/material";
import { CheckCircle, Person, PictureAsPdf } from "@mui/icons-material";

const columns = [
	{ id: "image", label: "Image", minWidth: 170 },
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "email", label: "Email", minWidth: 200 },
	{ id: "phone", label: "Phone", minWidth: 200 },
	{ id: "residence", label: "Residence", minWidth: 200 },
	{ id: "id", label: "ID/Passport", minWidth: 200 },
	{ id: "workPermit", label: "Work Permit", minWidth: 200 },
	{ id: "status", label: "Status", minWidth: 100 },
];

export default function Professional({ data }) {
	function createData(
		key,
		image,
		status,
		name,
		email,
		phone,
		residence,
		id,
		workPermit
	) {
		return {
			key,
			image,
			status,
			name,
			email,
			phone,
			residence,
			id,
			workPermit,
		};
	}
	const row = data?.map((item) =>
		createData(
			item.key,
			item.image,
			item.status,
			item.name,
			item.email,
			item.phone,
			item.residence,
			item.id,
			item.workPermit
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
													) : column.id === "residence" ||
													  column.id === "id" ||
													  column.id === "workPermit" ? (
														<a href={value} target="blank">
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
																{column.id.toUpperCase()}
															</Button>
														</a>
													) : column.id === "status" ? (
														value ? (
															<Typography color={"red"} variant="p">
																{value.toUpperCase()}
															</Typography>
														) : (
															<CheckCircle />
														)
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
