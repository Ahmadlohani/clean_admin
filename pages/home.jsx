import React, { useState, useEffect } from "react";
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, Switch } from "antd";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AboutCont from "../components/AboutCont";
import UserRoute from "../components/UserRoute/UserRoute";
import { UserContext } from "../context";
const { Meta } = Card;
const Home = () => {
	const aboutImage = "/images/about.jpg";
	const coming = "/images/smi1.jpg";
	const coming1 = "/images/smi2.jpg";
	const coming2 = "/images/smi3.jpg";

	const { state } = useContext(UserContext);
	return (
		<UserRoute>
			<div className="container-fluid">
				<Row>
					<Col>
						<Card
							style={{
								width: 300,
								marginTop: 16,
							}}
							actions={[
								<SettingOutlined key="setting" />,
								<EditOutlined key="edit" />,
								<EllipsisOutlined key="ellipsis" />,
							]}
						>
							<Meta
								avatar={
									<Avatar>
										{state &&
											state.user &&
											state.user.name &&
											state.user.name[0]}
									</Avatar>
								}
								title={
									state && state.user && state.user.name
								}
								description={
									state && state.user && state.user.email
								}
							/>
						</Card>
					</Col>
					<Col className="d-flex justify-content-center">
						<Card
							title="Bhook Mitao"
							bordered={false}
							style={{ width: 500, marginTop: "10px" }}
							className="shadow"
						>
							<p>
								Bhook Mitao is a web app which aims to help
								reduce mal nutrition and food shortage for
								the poor and needy people.
							</p>
						</Card>
					</Col>
				</Row>
				<div className="row my-3">
					<div className="col d-flex justify-content-center my-2">
						<Card
							hoverable
							style={{ width: 240 }}
							cover={<img alt="example" src={coming} />}
						>
							<Meta
								title="Food fest at Gujranwala"
								description="Arranged a feast at Gujranwala city. Focused on interacting with active members for donations and assuring them about the charity work"
							/>
						</Card>
					</div>
					<div className="col d-flex justify-content-center my-2">
						<Card
							hoverable
							style={{ width: 240 }}
							cover={<img alt="example" src={coming1} />}
						>
							<Meta
								title="Lahore Food Program"
								description="Charity get together. Met with all active members and discussed the work progress"
							/>
						</Card>
					</div>
					<div className="col d-flex justify-content-center my-2">
						<Card
							hoverable
							style={{ width: 240 }}
							cover={<img alt="example" src={coming2} />}
						>
							<Meta
								title="Sialkot Food Drive"
								description="An event focusing on people of sialkot. Raising awareness in them to stop the food wastage and winning their confidence by assuring quality work"
							/>
						</Card>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<AboutCont aboutImage={aboutImage} />
					</div>
				</div>
			</div>
		</UserRoute>
	);
};

export default Home;
