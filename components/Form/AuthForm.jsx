import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
	handleSubmit,
	username,
	SetUsername,
	about,
	SetAbout,
	name,
	SetName,
	email,
	SetEmail,
	password,
	SetPassword,
	security,
	SetSecurity,
	loading,
	page,
}) => {
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				{page === "profile" && (
					<>
						<FloatingLabel
							className="my-3"
							label="Username"
						>
							<Form.Control
								type="text"
								name="username"
								value={username}
								onChange={(e) =>
									SetUsername(e.target.value)
								}
								placeholder="Username"
							/>
						</FloatingLabel>
						<FloatingLabel
							className="my-3"
							label="Write About you"
						>
							<Form.Control
								type="text"
								name="about"
								value={about}
								onChange={(e) => SetAbout(e.target.value)}
								placeholder="Write About you"
							/>
						</FloatingLabel>
					</>
				)}
				{page !== "login" && (
					<FloatingLabel
						controlId="floatingName"
						className="mb-3"
						label="Name"
					>
						<Form.Control
							type="text"
							name="name"
							placeholder="Name"
							value={name}
							onChange={(e) => SetName(e.target.value)}
						/>
					</FloatingLabel>
				)}
				<FloatingLabel
					controlId="floatingInput"
					label="Email address"
					className="mb-3"
				>
					<Form.Control
						type="text"
						name="email"
						value={email}
						onChange={(e) => SetEmail(e.target.value)}
						placeholder="id"
						disabled={page === "profile"}
					/>
				</FloatingLabel>
				<FloatingLabel
					controlId="floatingPassword"
					className="mb-3"
					label="Password"
				>
					<Form.Control
						type="password"
						name="password"
						value={password}
						onChange={(e) => SetPassword(e.target.value)}
						placeholder="Password"
					/>
				</FloatingLabel>
				{page !== "login" && (
					<>
						<FloatingLabel
							controlId="floatingSelect"
							label="Security Question"
						>
							<Form.Select aria-label="Floating label select example">
								<option value="color">
									What is your Favourite Color?
								</option>
								<option value="color">
									What is your first pet?
								</option>
								<option value="color">
									Which city you were born?
								</option>
							</Form.Select>
						</FloatingLabel>
						<small className="text-muted">
							You can use it in case you forget your
							password.
						</small>
						<FloatingLabel
							className="my-3"
							label="Write Answer Here"
						>
							<Form.Control
								type="text"
								name="security"
								value={security}
								onChange={(e) =>
									SetSecurity(e.target.value)
								}
								placeholder="Answer"
							/>
						</FloatingLabel>
					</>
				)}
				<Button
					type="submit"
					className="col-12"
					disabled={
						page === "profile"
							? loading
							: page === "login"
							? !email || !password
							: !name || !email || !password || !security
					}
				>
					{loading ? (
						<SyncOutlined spin className="py-1" />
					) : (
						"Submit"
					)}
				</Button>
			</Form>
		</div>
	);
};

export default AuthForm;
