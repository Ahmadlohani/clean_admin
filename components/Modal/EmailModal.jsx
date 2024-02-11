import React, { useState } from "react";
import {
	Modal,
	TextField,
	Button,
	Box,
	Paper,
	Typography,
	IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";
const style = {
	width: 400,
	bgcolor: "white",
	border: "none",
	borderRadius: "10px",
	boxShadow: 24,
	p: 4,
};
const EmailModal = ({ open, setOpen, handleSubmit }) => {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	const handleClose = () => {
		setOpen(false);
	};
	const handleSend = () => {
		if (!title || !message) {
			toast.error("Please fill all fields");
			return;
		}
		handleSubmit(title, message);
		setTitle("");
		setMessage("");
	};
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<Paper elevation={3} style={style}>
					<Box
						sx={{
							padding: 2,
						}}
					>
						<Box
							display={"flex"}
							alignItems={"baseline"}
							justifyContent={"space-between"}
							mb={2}
						>
							<Typography
								textAlign={"center"}
								fontSize={15}
								fontWeight={"bold"}
								color={"#000"}
								mb={1}
							>
								Rejection Email
							</Typography>
							<Close
								onClick={handleClose}
								fontSize="small"
								sx={{
									cursor: "pointer",
									color: "#fff",
									bgcolor: "#000",
									borderRadius: "50%",
								}}
							/>
						</Box>
						<TextField
							label="Title"
							value={title}
							fullWidth
							onChange={(e) => setTitle(e.target.value)}
							style={{ marginBottom: "10px" }}
						/>
						<Typography fontSize={12} fontWeight={"bold"} color={"red"} mb={1}>
							Ask to register again and inform them of the reason for rejection.
						</Typography>
						<TextField
							label="Message"
							value={message}
							fullWidth
							onChange={(e) => setMessage(e.target.value)}
							multiline
							rows={4}
							style={{ marginBottom: "10px" }}
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSend}
							fullWidth
						>
							Send
						</Button>
					</Box>
				</Paper>
			</Modal>
		</div>
	);
};

export default EmailModal;
