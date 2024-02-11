import axios from "axios";

const secretToken = "b775be48-a708-403a-a414-e77c2ab4e503";

export default async function sendEmail(req, res) {
	if (req.method === "POST") {
		const { From, To, Subject, TextBody, MessageStream } = req.body;
		const body = {
			From,
			To,
			Subject,
			TextBody,
			MessageStream,
		};
		try {
			const { data } = await axios.post(
				"https://api.postmarkapp.com/email",
				body,
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"X-Postmark-Server-Token": secretToken,
					},
				}
			);
			return res.json({
				message: "Email sent successfully",
				data,
			});
		} catch (error) {
			return res.json({ error: "Failed to send email", data: error });
		}
	} else {
		return res.json({ error: "Method not allowed" });
	}
}
