import { NextResponse } from "next/server";

export default function middleware(req) {
	let url = req.url;
	let verify = req.cookies.get("clean_admin_auth");
	if (!verify && url.includes("/dashboard")) {
		return NextResponse.redirect(
			process.env.NEXT_PUBLIC_URL
		);
	}
	if (verify && url === process.env.NEXT_PUBLIC_URL) {
		return NextResponse.redirect(
			process.env.NEXT_PUBLIC_URL + "dashboard"
		);
	}
}
