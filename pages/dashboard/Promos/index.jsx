import AppDrawer from "../../../components/AppDrawer/AppDrawer";
import { Box, Grid, Typography } from "@mui/material";
import {
	collection,
	deleteField,
	doc,
	onSnapshot,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import PromoList from "../../../components/Tables/PromoList";
import { toast } from "react-toastify";

const Promos = () => {
	const [promos, setPromos] = useState(null);
	const [loading, setLoading] = useState(false);
	const loaderImage = "/images/loader.gif";
	useEffect(() => {
		return getPromos();
	}, []);
	const getPromos = async () => {
		const promos = query(
			collection(db, "Pricing"),
			where("promo.promo", "!=", "")
		);
		setLoading(true);
		onSnapshot(promos, (querySnapshot) => {
			let items = [];
			if (querySnapshot.size == 0) {
				setLoading(false);
				setPromos(null);
			} else {
				setLoading(false);
				querySnapshot.forEach((doc) => {
					items.push({ key: doc.id, ...doc.data() });
				});
				setPromos(items);
			}
		});
	};
	const handlePromoEnd = async (id) => {
		const confirm = window.confirm("Are you sure you want to end this promo?");
		if (!confirm) {
			return;
		}
		try {
			setLoading(true);
			const promoRef = doc(db, "Pricing", id);
			await updateDoc(promoRef, {
				promo: deleteField(),
			});
			setLoading(false);
			toast.success("Promo Ended");
		} catch (error) {
			setLoading(false);
			toast.error(error.message);
			console.log(error);
		}
	};
	return (
		<div>
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
			<AppDrawer page={"Active Promos"}>
				<Box sx={{ flexGrow: 1 }}>
					<Typography
						variant="h5"
						component="h5"
						bgcolor={"#000"}
						borderRadius={1}
						mb={1}
						color={"#fff"}
						textAlign={"center"}
						paddingY={1}
						fontWeight={"bold"}
					>
						Active Promo Codes
					</Typography>
					{promos !== null ? (
						<Grid container>
							<Grid item xs={12}>
								<PromoList data={promos} handlePromoEnd={handlePromoEnd} />
								{/* {JSON.stringify(promos, null, 4)} */}
							</Grid>
						</Grid>
					) : (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "50vh",
							}}
						>
							<Typography>No Promo Codes Yet</Typography>
						</Box>
					)}
				</Box>
			</AppDrawer>
		</div>
	);
};

export default Promos;
