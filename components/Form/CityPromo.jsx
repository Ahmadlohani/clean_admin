import {
	Box,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const CityPromo = ({ handleChange, handleSubmit, detail }) => {
	return (
		<Container>
			<Grid
				container
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
				marginBottom={2}
			>
				<Grid item xs={12} sm={6}>
					<Box>
						<Box my={1}>
							<Typography
								variant="p"
								sx={{
									fontWeight: "400",
									fontSize: 15,
								}}
							>
								Note: To add Promo, fill all promo related fields
							</Typography>
						</Box>
						<Box
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
							gap={1}
						>
							<TextField
								id="outlined-basic"
								label="Promo"
								variant="outlined"
								fullWidth
								sx={{ my: 1 }}
								value={detail.promo}
								onChange={(e) => handleChange("promo", e.target.value)}
							/>
							<TextField
								id="outlined-basic"
								label="Promo Value (%)"
								variant="outlined"
								fullWidth
								sx={{ my: 1 }}
								inputProps={{ type: "number" }}
								value={detail.promoValue}
								onChange={(e) => handleChange("promoValue", e.target.value)}
							/>
						</Box>
						<Box>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DatePicker"]}>
									<DatePicker
										label="Promo Date"
										sx={{ width: "100%" }}
										value={detail.promoDate}
										onChange={(e) => handleChange("promoDate", e)}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</Box>
						<Button
							variant="contained"
							color="warning"
							fullWidth
							sx={{ my: 1 }}
							onClick={handleSubmit}
						>
							Add Promo
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default CityPromo;
