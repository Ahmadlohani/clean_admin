import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import {
	AccountBalance,
	Article,
	BookOnline,
	Dashboard,
	Discount,
	Engineering,
	Logout,
	People,
	Sell,
} from "@mui/icons-material";
import Link from "next/link";
import Cookies from "js-cookie";

const drawerWidth = 240;

export default function AppDrawer(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const route = useRouter();
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const handleNavigation = (text) => {
		route.push(
			text === "Dashboard"
				? "/dashboard"
				: text === "Customers"
				? "/dashboard/customers"
				: text === "Professionals"
				? "/dashboard/professionals"
				: text === "Bookings"
				? "/dashboard/Bookings"
				: text === "Pricing"
				? "/dashboard/Pricing"
				: text === "Active Promos"
				? "/dashboard/Promos"
				: text === "SetPricing"
				? "/dashboard/Promos/SetPricing"
				: text === "Accounts"
				? "/dashboard/Accounts"
				: "/dashboard/proRequests"
		);
	};
	const drawer = (
		<div>
			<Box
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
				margin={1.5}
				bgcolor={"#ffffff"}
			>
				<Link href={"/"}>
					<img src={"/images/logo.png"} alt="Logo" width={150} height={30} />
				</Link>
			</Box>
			<Divider sx={{ backgroundColor: "white" }} />
			<Toolbar />
			<List>
				{[
					"Dashboard",
					"Customers",
					"Professionals",
					"Pro Requests",
					"Bookings",
					"Pricing",
					"Active Promos",
					"Accounts",
				].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton
							onClick={() => handleNavigation(text)}
							sx={
								props.page === text
									? {
											backgroundColor: "#ffffff",
											color: "#000000",
											"&:hover": {
												backgroundColor: "#ffffff",
												color: "#000000",
											},
									  }
									: {
											color: "#ffffff",
									  }
							}
						>
							<ListItemIcon
								sx={
									props.page === text
										? {
												color: "#000000",
										  }
										: {
												color: "#ffffff",
										  }
								}
							>
								{index === 0 ? (
									<Dashboard />
								) : index === 1 ? (
									<People />
								) : index === 2 ? (
									<Engineering />
								) : index === 3 ? (
									<Article />
								) : index === 4 ? (
									<BookOnline />
								) : index === 5 ? (
									<Discount />
								) : index === 6 ? (
									<Sell />
								) : (
									<AccountBalance />
								)}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider sx={{ backgroundColor: "white" }} />
			<List>
				{["Logout"].map((text) => (
					<ListItem key={text} disablePadding>
						<ListItemButton
							onClick={() => {
								Cookies.remove("clean_admin_auth");
								route.push("/");
							}}
						>
							<ListItemIcon sx={{ color: "#ffffff" }}>
								<Logout />
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					backgroundColor: "#000000",
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Hello, Admin
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{
					width: { sm: drawerWidth },
					flexShrink: { sm: 0 },
				}}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							bgcolor: "#000000",
							color: "#ffffff",
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							backgroundColor: "#000000",
							color: "#ffffff",
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				{props.children}
			</Box>
		</Box>
	);
}
