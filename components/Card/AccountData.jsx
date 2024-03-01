import * as React from "react";
import CustomerWallet from "../Form/CustomerWallet";
import ProWallet from "../Form/ProWallet";

export default function AccountData({ data, mode }) {
	return (
		<div>
			{mode === "customer" ? (
				<CustomerWallet data={data} />
			) : (
				<ProWallet data={data} />
			)}
		</div>
	);
}
