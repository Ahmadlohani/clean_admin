import AppDrawer from "../../components/AppDrawer/AppDrawer";
import { Box, Typography } from "@mui/material";

const index = () => {
	return (
		<div>
			<AppDrawer page={"Dashboard"}>
				<Box sx={{ flexGrow: 1 }}>
					<Typography variant="h3" component="h3">
						Welcome to Admin Dashboard
					</Typography>
					<Typography variant="h6" component="h6">
						Make decisions based on the data provided
					</Typography>
				</Box>
			</AppDrawer>
		</div>
	);
};

export default index;
