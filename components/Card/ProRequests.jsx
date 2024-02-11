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
import { Person, PictureAsPdf } from "@mui/icons-material";
import EmailModal from "../Modal/EmailModal";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import axios from "axios";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";

const columns = [
	{ id: "image", label: "Image", minWidth: 170 },
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "email", label: "Email", minWidth: 200 },
	{ id: "phone", label: "Phone", minWidth: 200 },
	{ id: "residence", label: "Residence", minWidth: 200 },
	{ id: "id", label: "ID/Passport", minWidth: 200 },
	{ id: "workPermit", label: "Work Permit", minWidth: 200 },
	{ id: "action", label: "Action", minWidth: 200 },
];

export default function ProRequests({ data, handleAccept }) {
	const [emailModalVisible, setEmailModalVisible] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [rejectionItems, setRejectionItems] = React.useState({
		docId: "",
		email: "",
		pswd: "",
	});
	const loaderImage = "/images/loader.gif";
	const handleReject = (docId, email, pswd) => {
		setRejectionItems({ ...rejectionItems, docId, email, pswd });
		setEmailModalVisible(true);
	};
	function createData(
		action,
		imagePro,
		name,
		email,
		pswd,
		phone,
		residence,
		id,
		workPermit
	) {
		return {
			image: imagePro || "",
			name,
			email,
			pswd,
			phone,
			residence,
			id,
			workPermit,
			action,
		};
	}
	const row = data?.map((item) =>
		createData(
			item.key,
			item.data.image,
			item.data.name,
			item.data.email,
			item.data.pswd,
			item.data.phone,
			item.data.residence,
			item.data.id,
			item.data.workPermit
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
	const handleRejectAccount = async (title, message) => {
		try {
			setEmailModalVisible(false);
			setLoading(true);
			const body = {
				From: "support@cleantask.co.za",
				To: rejectionItems.email,
				Subject: title,
				TextBody: message,
				MessageStream: "outbound",
			};
			const { data } = await axios.post(
				process.env.NEXT_API_URL + "sendEmail",
				body,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (data.error) {
				toast.error(data.error);
				console.log(data);
				return;
			}
			const proRef = doc(db, "Users", rejectionItems.docId);
			await deleteDoc(proRef);
			await signInWithEmailAndPassword(
				auth,
				rejectionItems.email,
				rejectionItems.pswd
			);
			await deleteUser(auth.currentUser);
			setLoading(false);
			toast.success("Account rejected and email sent to user");
		} catch (error) {
			setLoading(false);
			toast.error(error.message);
			console.log(error);
		}
	};
	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
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
			<EmailModal
				open={emailModalVisible}
				setOpen={setEmailModalVisible}
				handleSubmit={handleRejectAccount}
			/>
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
											const mail = row["email"];
											const pswd = row["pswd"];
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
													) : column.id === "action" ? (
														<>
															<Button
																variant="contained"
																color="success"
																onClick={() => handleAccept(value, mail, pswd)}
																sx={{ mb: 1 }}
															>
																Approve
															</Button>
															<Button
																variant="contained"
																color="error"
																onClick={() => handleReject(value, mail, pswd)}
															>
																Reject
															</Button>
														</>
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
