import { useEffect, useState } from "react";
import axios from "axios";
import useShop from "../ShopContext";
import toast from "react-hot-toast";

const Payment = () => {
	const initialPayment = {
		evc: false,
		zaad: false,
		sahal: false,
	};

	const [paymentMethod, setPaymentMethod] = useState(initialPayment);
	const [updated, setUpdated] = useState(false);
	const [phone, setPhone] = useState("");
	const [loading, setLoading] = useState(false);

	const { total, clearCart } = useShop();

	useEffect(() => {}, [updated]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!phone)
			return toast.error("Phone is empty", {
				style: {
					border: "1px solid #713200",
					padding: "16px",
					color: "#713200",
				},
				iconTheme: {
					primary: "#713200",
					secondary: "#FFFAEE",
				},
			});
		processPayment();
	};

	const processPayment = async () => {
		try {
			const body = {
				schemaVersion: "1.0",
				requestId: "10111331033",
				timestamp: 1590587436057686,
				channelName: "WEB",
				serviceName: "API_PURCHASE",
				serviceParams: {
					merchantUid: process.env.REACT_APP_MERCHANT_U_ID,
					apiUserId: process.env.REACT_APP_MERCHANT_API_USER_ID,
					apiKey: process.env.REACT_APP_MERCHANT_API_KEY,
					paymentMethod: "mwallet_account",
					payerInfo: {
						accountNo: phone,
					},
					transactionInfo: {
						referenceId: "12334",
						invoiceId: "7896504",
						amount: total,
						currency: "USD",
						description: "React Shopping Cart",
					},
				},
			};
			setLoading(true);
			const { data } = await axios.post("https://api.waafi.com/asm", body);
			setLoading(false);

			const info = data.responseMsg.split("ERRCODE");
			// success
			console.log(info);
			if (info.length == 1) {
				setUpdated(!updated);
				alert("Succefully ordered");
				clearCart();
			} else {
				// errro
				if (data.responseMsg.split("ERRCODE")[2].includes("4004")) {
					// toast.error("User rejected");
					alert("User rejected");
					setUpdated(!updated);
				}

				if (data.responseMsg.split("ERRCODE")[2].includes("6002")) {
					// toast.error("Numberka sirta ah waa khalad");
					alert("Numberka sirta ah waa khalad");
					setUpdated(!updated);
				}
			}

			console.log(info);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<h2>Pay With</h2>
			<div className="paymet-cards">
				<div
					className={`payment-card ${paymentMethod.zaad && "selected"}`}
					onClick={() => setPaymentMethod({ ...initialPayment, zaad: true })}>
					<h3>Zaad Service</h3>
				</div>
				<div
					className={`payment-card ${paymentMethod.evc && "selected"}`}
					onClick={() => setPaymentMethod({ ...initialPayment, evc: true })}>
					<h3>Evc Plus</h3>
				</div>
				<div
					className={`payment-card ${paymentMethod.sahal && "selected"}`}
					onClick={() => setPaymentMethod({ ...initialPayment, sahal: true })}>
					<h3>Sahal</h3>
				</div>

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="form-control"
						placeholder="2526..."
						onChange={(e) => setPhone(e.target.value)}
					/>
					<button className="btn-proceed">
						{loading ? "Loading..." : "Proceed"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Payment;
