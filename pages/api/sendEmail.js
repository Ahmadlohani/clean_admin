import axios from "axios";

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
						"X-Postmark-Server-Token": process.env.POSTMARK_SECRET,
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
