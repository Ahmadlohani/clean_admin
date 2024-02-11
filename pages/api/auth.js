export default async function auth(req, res) {
	if (req.method === "POST") {
		const { username, pswd } = req.body;
		try {
			if (username === "cleanadmin" && pswd === "cleanadminpass") {
				return res.json({ success: true });
			} else {
				return res.json({
					success: false,
					message: "Invalid username or password",
				});
			}
		} catch (error) {
			return res.json({ success: false, message: error });
		}
	} else {
		return res.json({ success: false, message: "Method not allowed" });
	}
}
