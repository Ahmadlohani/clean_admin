import { Box, Button, Container, Grid, TextField } from "@mui/material";
import React from "react";

const CityPricing = ({ handleChange, handleSubmit, detail }) => {
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
					<Box
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						gap={1}
					>
						<TextField
							id="outlined-basic"
							label="One Bedroom Price *"
							variant="outlined"
							fullWidth
							sx={{ my: 1 }}
							inputProps={{ type: "number" }}
							value={detail.oneBedroomPrice}
							onChange={(e) => handleChange("oneBedroomPrice", e.target.value)}
						/>
						<TextField
							id="outlined-basic"
							label="One Bathroom Price *"
							variant="outlined"
							fullWidth
							sx={{ my: 1 }}
							inputProps={{
								type: "number",
							}}
							value={detail.oneBathroomPrice}
							onChange={(e) => handleChange("oneBathroomPrice", e.target.value)}
						/>
					</Box>
					<Box
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						gap={1}
					>
						<TextField
							id="outlined-basic"
							label="Bedroom Percent Increment *"
							variant="outlined"
							fullWidth
							sx={{ my: 1 }}
							inputProps={{ type: "number" }}
							value={detail.bedPerInc}
							onChange={(e) => handleChange("bedPerInc", e.target.value)}
						/>
						<TextField
							id="outlined-basic"
							label="Bathroom Percent Increment*"
							variant="outlined"
							fullWidth
							sx={{ my: 1 }}
							inputProps={{
								type: "number",
							}}
							value={detail.bathPerInc}
							onChange={(e) => handleChange("bathPerInc", e.target.value)}
						/>
					</Box>
					<Box
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						gap={1}
					>
						<TextField
							id="outlined-basic"
							label="Laundry Price *"
							variant="outlined"
							fullWidth
							sx={{ my: 1 }}
							inputProps={{ type: "number" }}
							value={detail.laundry}
							onChange={(e) => handleChange("laundry", e.target.value)}
						/>
						<TextField
							id="outlined-basic"
							label="Ironing Price *"
							variant="outlined"
							fullWidth
							sx={{ my: 1 }}
							inputProps={{
								type: "number",
							}}
							value={detail.ironing}
							onChange={(e) => handleChange("ironing", e.target.value)}
						/>
					</Box>
					<Box
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						gap={1}
					>
						<TextField
							id="outlined-basic"
							label="Bin Price *"
							variant="outlined"
							fullWidth
							sx={{ my: 1 }}
							inputProps={{ type: "number" }}
							value={detail.bin}
							onChange={(e) => handleChange("bin", e.target.value)}
						/>
						<TextField
							id="outlined-basic"
							label="App Commission % *"
							variant="outlined"
							fullWidth
							sx={{ my: 1 }}
							inputProps={{
								type: "number",
							}}
							value={detail.appCommission}
							onChange={(e) => handleChange("appCommission", e.target.value)}
						/>
					</Box>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleSubmit}
						sx={{ mt: 1 }}
					>
						Submit
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default CityPricing;
