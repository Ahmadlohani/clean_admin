import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Button, TextField } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";

const columns = [
	{ id: "image", label: "Image", minWidth: 170 },
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "email", label: "Email", minWidth: 200 },
	{ id: "phone", label: "Phone", minWidth: 200 },
];

export default function Promo({ data }) {
	const [filteredUsers, setFilteredUsers] = useState(data);
	function createData(image, name, email, phone) {
		return { image, name, email, phone };
	}
	const row = filteredUsers?.map((item) =>
		createData(
			item.image,
			item.name + " " + item.lastname,
			item.email,
			item.phone
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
	const [promo, setPromo] = useState("");
	const [city, setCity] = useState("");
	const handlePromoChange = async (val) => {
		setPromo(val);
	};
	const handleCityChange = async (val) => {
		setCity(val);
		// const userFilter = [...filteredUsers];
		// const filtered = userFilter.filter((item) =>
		// 	item.location.city.includes(val)
		// );
		// setFilteredUsers(filtered);
	};
	const handlePromo = async (text) => {
		if (promo === "") {
			alert("Please fill promo code value");
			return;
		}
		if (text === "apply") {
			toast.success("Success! Promo is applied to Users");
		} else {
			toast.success(
				"Success! Promo is applied to All Users"
			);
		}
	};
	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell
								style={{ minWidth: 300 }}
								sx={{
									backgroundColor: "#000000",
									color: "#000000",
								}}
							>
								<TextField
									id="outlined-basic"
									label="Promo code"
									variant="outlined"
									fullWidth
									sx={{
										my: 1,
										backgroundColor: "#ffffff",
										color: "#000000",
										borderRadius: "5px",
									}}
									onChange={(e) =>
										handlePromoChange(e.target.value)
									}
								/>
							</TableCell>
							<TableCell
								style={{ minWidth: 300 }}
								sx={{
									backgroundColor: "#000000",
									color: "#000000",
								}}
							>
								<TextField
									id="outlined-basic"
									label="Search city..."
									variant="outlined"
									fullWidth
									sx={{
										my: 1,
										backgroundColor: "#ffffff",
										color: "#000000",
										borderRadius: "5px",
									}}
									onChange={(e) =>
										handleCityChange(e.target.value)
									}
								/>
							</TableCell>
							<TableCell
								style={{ minWidth: 200 }}
								sx={{
									backgroundColor: "#000000",
									color: "#000000",
								}}
							>
								<Button
									variant="contained"
									sx={{
										bgcolor: "white",
										color: "black",
										height: 60,
										"&:hover": {
											color: "white",
										},
									}}
									onClick={() => handlePromo("apply")}
								>
									Apply
								</Button>
							</TableCell>
							<TableCell
								style={{ minWidth: 200 }}
								sx={{
									backgroundColor: "#000000",
								}}
							>
								<Button
									variant="outlined"
									sx={{
										bgcolor: "#000000",
										color: "#ffffff",
										borderColor: "#ffffff",
										borderWidth: 2,
										height: 60,
									}}
									onClick={() => handlePromo("all")}
								>
									Apply To All
								</Button>
							</TableCell>
						</TableRow>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
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
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.code}
									>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align={column.align}
												>
													{column.id === "image" ? (
														value === "" ? (
															<Avatar>
																<Person />
															</Avatar>
														) : (
															<Avatar
																alt="profile"
																src={value}
															/>
														)
													) : column.id === "phone" ? (
														"+27-" + value
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
