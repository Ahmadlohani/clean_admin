import { Col } from "antd";
import {
	getDocs,
	orderBy,
	query,
	limit,
	collectionGroup,
	where,
	startAfter,
	updateDoc,
	doc,
	deleteField,
} from "firebase/firestore";
import React, {
	useContext,
	useEffect,
	useState,
} from "react";
import { Container, Row } from "react-bootstrap";
import UserRoute from "../components/UserRoute/UserRoute";
import { UserContext } from "../context";
import { auth, db } from "./firebase/Config";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
	sendEmailVerification,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
const Requests = () => {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [refresh, setRefresh] = useState(false);
	const [acceptloading, setAcceptloading] = useState(false);
	const { state } = useContext(UserContext);
	const fetchPerPage = 3;
	useEffect(() => {
		if (state && state.user) {
			// Setting array to store data from database
			setPage(1);
			const counts = query(
				collectionGroup(db, "users"),
				where("category", "==", "supplier"),
				where("status", "==", "requested"),
				orderBy("createdAt", "desc")
			);
			let total = 0;
			getDocs(counts)
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						// console.log(doc.id, " => ", doc.data());
						total = total + 1;
						// console.log(donArray);
					});
					setCount(total);
				})
				.catch((err) => console.log(err));
			const requests = query(
				collectionGroup(db, "users"),
				where("category", "==", "supplier"),
				where("status", "==", "requested"),
				orderBy("createdAt", "desc"),
				limit(fetchPerPage)
			);
			const items = [];
			getDocs(requests)
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						// console.log(doc.id, " => ", doc.data());
						items.push({ key: doc.id, ...doc.data() });
						// console.log(donArray);
					});
					setUsers(items);
				})
				.catch((err) => console.log(err));
			setRefresh(false);
		}
	}, [state && state.user]);
	const showNext = ({ item }) => {
		const fetchNextData = async () => {
			setPage(page + 1);
			const nextUsers = query(
				collectionGroup(db, "users"),
				where("category", "==", "supplier"),
				where("status", "==", "requested"),
				orderBy("createdAt", "desc"),
				startAfter(item.createdAt),
				limit(fetchPerPage)
			);
			try {
				const querySnapshot = await getDocs(nextUsers);
				let items = [];
				let append = [...users];
				querySnapshot.forEach((doc) => {
					items.push({ key: doc.id, ...doc.data() });
				});
				append = append.concat(items);
				setUsers(append);
			} catch (error) {
				console.log(error);
			}
		};
		fetchNextData();
	};
	const handleAccept = async (userId, email, password) => {
		const supplierRef = doc(
			db,
			`Auth/supplier/users`,
			`${userId}`
		);
		const request = {
			status: deleteField(),
		};
		setAcceptloading(true);
		updateDoc(supplierRef, request)
			.then(() => {
				makeVerificationMail(email, password);
			})
			.catch((error) => {
				toast.error("Exception occured");
				setAcceptloading(false);

				console.log(error);
			});
	};
	const makeVerificationMail = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const users = userCredential.user;
				handleMailVerification(users);
			})
			.catch((error) => {
				const errorMessage = error.message;
				toast.error(errorMessage);
				setAcceptloading(false);
			});
	};
	const handleMailVerification = async (users) => {
		if (users.emailVerified == false) {
			sendEmailVerification(auth.currentUser).then(() => {
				toast.info(
					"Verification link sent to your email. Please verify then login!"
				);
			});
			setAcceptloading(false);
			return false;
		}
	};
	return (
		<UserRoute>
			<div>
				<Container>
					<Row
						className="d-flex justify-content-center align-items-center p-3"
						style={{ backgroundColor: "#2994a7" }}
					>
						<Col className="text-white">
							Supplier Requests
						</Col>
					</Row>
					{/* {JSON.stringify(users, null, 4)} */}
					<Row>
						<Col>
							{users.length == 0 ? (
								<div className="d-flex justify-content-center align-items-center my-5">
									<h6 className="text-center">
										There are no supplier requests{" "}
										<i className="far fa-users"></i>
									</h6>
								</div>
							) : (
								users.map((val, i) => (
									<div className="my-2 mx-2" key={i}>
										<Card>
											<Card.Header>Supplier</Card.Header>
											<Card.Body>
												<Card.Title>{val.name}</Card.Title>
												<Card.Text>{val.email}</Card.Text>
												<Card.Text>
													{val.place +
														", " +
														val.city +
														", " +
														val.zip}
												</Card.Text>
											</Card.Body>
											<Card.Footer className="d-flex justify-content-between">
												<Button
													variant="success"
													onClick={() =>
														handleAccept(
															val.userId,
															val.email,
															val.pd
														)
													}
													disabled={acceptloading}
												>
													Accept{" "}
													<i className="fas fa-user-check"></i>
												</Button>
												<Button variant="danger">
													Deny{" "}
													<i className="far fa-user-times"></i>
												</Button>
											</Card.Footer>
										</Card>
									</div>
								))
							)}
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="d-flex justify-content-center my-2">
								{count - page * 3 < 1 ? (
									""
								) : (
									<Button
										variant="warning"
										onClick={() =>
											showNext({
												item: users[users.length - 1],
											})
										}
										style={{
											borderRadius: 20,
											color: "white",
										}}
									>
										Load More
									</Button>
								)}
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</UserRoute>
	);
};

export default Requests;
