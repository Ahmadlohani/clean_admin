import { useContext } from "react";
import { UserContext } from "../../context";
import moment from "moment";
import Card from "react-bootstrap/Card";
import renderHTML from "react-render-html";
import { Avatar } from "antd";
import PostImage from "../image/PostImage";
import { useRouter } from "next/router";
import {
	EditOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
const PostList = ({ posts, handleDelete }) => {
	const { state } = useContext(UserContext);
	const router = useRouter();
	return (
		<div>
			{posts &&
				posts.map((val) => (
					<div key={val._id}>
						<br />
						<Card>
							<Card.Header>
								<Avatar size={40}>
									{val.postedBy.name[0]}
								</Avatar>{" "}
								<span className="mx-2">
									{val.postedBy.name}
								</span>
								<span className="mx-2">
									{moment(val.createdAt).fromNow()}
								</span>
							</Card.Header>
							<Card.Body>
								<Card.Text>
									{renderHTML(val.content)}
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								{val.image && <PostImage url={val.image} />}
								<br />
								<div className="d-flex justify-content-end">
									{state &&
										state.user &&
										state.user._id === val.postedBy._id && (
											<>
												<EditOutlined
													onClick={() =>
														router.push(
															`/user/post/${val._id}`
														)
													}
													className="text-danger h5"
												/>
												<DeleteOutlined
													onClick={() =>
														handleDelete(
															val._id,
															val.filename
														)
													}
													className="text-danger mx-3 h5"
												/>
											</>
										)}
								</div>
							</Card.Footer>
						</Card>
					</div>
				))}
		</div>
	);
};

export default PostList;
