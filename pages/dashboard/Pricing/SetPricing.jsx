import AppDrawer from "../../../components/AppDrawer/AppDrawer";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
	deleteField,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CityPricing from "../../../components/Form/CityPricing";
import CityPromo from "../../../components/Form/CityPromo";
import moment from "moment";
import dayjs from "dayjs";

const SetPricing = () => {
	const route = useRouter();
	const { suburbId } = route.query;
	const [promoVisible, setPromoVisible] = useState(false);
	const loaderImage = "/images/loader.gif";
	const [promo, setPromo] = useState({
		promo: "",
		promoDate: dayjs(new Date()),
		promoValue: 0,
	});
	const [detail, setDetail] = useState({
		oneBedroomPrice: 0,
		oneBathroomPrice: 0,
		bedPerInc: 0,
		bathPerInc: 0,
		laundry: 0,
		bin: 0,
		ironing: 0,
		appCommission: 0,
		city: "",
		suburb: "",
		newSuburbId: "",
		postal: 0,
	});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (suburbId) {
			getPricing();
		}
	}, [suburbId]);
	const getPricing = async () => {
		try {
			setLoading(true);
			const priceRef = doc(db, "Pricing", suburbId);
			const docSnap = await getDoc(priceRef);
			if (docSnap.exists() && docSnap.data()) {
				if (docSnap.data().promo) {
					setPromoVisible(true);
					const promoValues = docSnap.data().promo;
					setPromo({
						promo: promoValues.promo,
						promoValue: promoValues.promoValue,
						promoDate: promoValues.promoDate,
					});
				}
				setDetail({
					oneBedroomPrice: docSnap.data().oneBedroomPrice,
					oneBathroomPrice: docSnap.data().oneBathroomPrice,
					bedPerInc: docSnap.data().bedPerInc,
					bathPerInc: docSnap.data().bathPerInc,
					laundry: docSnap.data().laundry,
					bin: docSnap.data().bin,
					ironing: docSnap.data().ironing,
					appCommission: docSnap.data().appCommission,
					city: docSnap.data().city,
					suburb: docSnap.data().suburb,
					postal: docSnap.data().postal,
				});
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	const handleChange = async (name, value) => {
		if (name === "suburb") {
			let uniqueSuburb = value.toLowerCase().replace(/\s/g, "");
			setDetail({ ...detail, newSuburbId: uniqueSuburb, suburb: value });
			return;
		}
		setDetail({ ...detail, [name]: value });
	};
	const handlePromoChange = async (name, value) => {
		setPromo({ ...promo, [name]: value });
	};
	const handleSubmit = async () => {
		try {
			setLoading(true);
			if (suburbId) {
				const priceRef = doc(db, "Pricing", suburbId);
				const docSnap = await getDoc(priceRef);
				if (docSnap.exists()) {
					await updateDoc(priceRef, {
						oneBedroomPrice: detail.oneBedroomPrice,
						oneBathroomPrice: detail.oneBathroomPrice,
						bedPerInc: detail.bedPerInc,
						bathPerInc: detail.bathPerInc,
						laundry: detail.laundry,
						bin: detail.bin,
						ironing: detail.ironing,
						appCommission: detail.appCommission,
						suburb: detail.suburb,
						city: detail.city,
						postal: detail.postal,
					});
				}
			} else {
				const newPriceRef = doc(db, "Pricing", detail.newSuburbId);
				await setDoc(newPriceRef, {
					oneBedroomPrice: detail.oneBedroomPrice,
					oneBathroomPrice: detail.oneBathroomPrice,
					bedPerInc: detail.bedPerInc,
					bathPerInc: detail.bathPerInc,
					laundry: detail.laundry,
					bin: detail.bin,
					ironing: detail.ironing,
					appCommission: detail.appCommission,
					suburb: detail.suburb,
					city: detail.city,
					postal: detail.postal,
				});
			}
			setLoading(false);
			toast.success("Pricing Added");
		} catch (error) {
			setLoading(false);
			toast.error("Something went wrong");
			console.log(error);
		}
	};
	const handlePromoAdd = async () => {
		if (promo.promo == "" || promo.promoValue == 0) {
			toast.error("Please fill all the fields");
			return;
		}
		try {
			const priceData = {
				promo: promo.promo,
				promoValue: promo.promoValue,
				promoDate: new Date(promo.promoDate),
			};
			const promoData = {
				promo: promo.promo,
				promoValue: promo.promoValue,
				promoDate: new Date(promo.promoDate),
				suburbId: suburbId,
				users: [],
			};
			const priceRef = doc(db, "Pricing", suburbId);
			const promoRef = doc(db, "Promo", promo.promo);
			await updateDoc(priceRef, { promo: priceData });
			await setDoc(promoRef, promoData);
			getPricing();
			setLoading(false);
			toast.success("Promo Added Successfully");
		} catch (error) {
			setLoading(false);
			toast.error("Something went wrong");
			console.log(error);
		}
	};
	const handlePromoEnd = async () => {
		try {
			const priceRef = doc(db, "Pricing", suburbId);
			await updateDoc(priceRef, { promo: deleteField() });
			setPromo({
				promo: "",
				promoDate: dayjs(new Date()),
				promoValue: 0,
			});
			setPromoVisible(false);
			setLoading(false);
			toast.success("Promo Ended Successfully");
		} catch (error) {
			setLoading(false);
			toast.error("Something went wrong");
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
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<img src={loaderImage} width={100} height={100} />
				</Box>
			)}
			<AppDrawer page={"SetPricing"}>
				<Box>
					<Typography
						bgcolor={"#000"}
						borderRadius={1}
						mb={1}
						color={"#fff"}
						textAlign={"center"}
						paddingY={1}
						fontWeight={"bold"}
						fontSize={20}
					>
						Set Pricing
					</Typography>
					{
						<Grid container borderRadius={1}>
							{promoVisible && (
								<Grid container marginY={2}>
									<Grid item xs={12}>
										<Box
											sx={{
												backgroundColor: "lightgray",
												borderRadius: 1,
												padding: 2,
											}}
										>
											<Box
												display={"flex"}
												alignItems={"center"}
												justifyContent={"space-between"}
												flexWrap={"wrap"}
											>
												<Typography
													variant="h6"
													display={"flex"}
													alignItems={"center"}
													gap={2}
												>
													Promo Code:{" "}
													<Typography variant="h5">{promo.promo}</Typography>
												</Typography>
												<Typography
													variant="h6"
													display={"flex"}
													alignItems={"center"}
													gap={2}
												>
													Promo Value:{" "}
													<Typography variant="h5">
														{promo.promoValue}
													</Typography>
												</Typography>
												<Typography
													variant="h6"
													display={"flex"}
													alignItems={"center"}
													gap={2}
												>
													Promo Expiry Date:{" "}
													<Typography variant="h5">
														{moment(promo.promoDate.seconds * 1000).format(
															"DD MMM, YYYY"
														)}
													</Typography>
												</Typography>
											</Box>
											<Button
												variant="contained"
												color="error"
												onClick={handlePromoEnd}
												sx={{ marginTop: 2 }}
											>
												End Promo
											</Button>
										</Box>
									</Grid>
								</Grid>
							)}
						</Grid>
					}
					{!promoVisible && suburbId && (
						<Grid
							container
							bgcolor={"lightgray"}
							borderRadius={1}
							padding={2}
							marginY={2}
						>
							<Grid item xs={12}>
								<CityPromo
									handleChange={handlePromoChange}
									detail={promo}
									handleSubmit={handlePromoAdd}
								/>
							</Grid>
						</Grid>
					)}
					<Grid
						container
						bgcolor={"lightgray"}
						borderRadius={1}
						padding={2}
						marginY={2}
					>
						<Grid item xs={12}>
							<CityPricing
								detail={detail}
								handleChange={handleChange}
								handleSubmit={handleSubmit}
							/>
						</Grid>
					</Grid>
				</Box>
			</AppDrawer>
		</div>
	);
};

export default SetPricing;
