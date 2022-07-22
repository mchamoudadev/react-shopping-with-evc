import useShop from "../ShopContext";
import { useEffect, useState } from "react";

const Product = ({ product }) => {
	const { addToCart, removeFromCart, products } = useShop();

	const [isInCart, setIsInCart] = useState(false);

	useEffect(() => {
		const isCart = products.filter((pro) => pro.id == product.id);

		if (isCart.length > 0) {
			setIsInCart(true);
		} else {
			setIsInCart(false);
		}
	}, [products]);

	const handleAddToCart = () => {
		if (isInCart) {
			removeFromCart(product);
		} else {
			addToCart(product);
		}
		// console.log(products);
	};

	return (
		<div
			className="card"
			style={{
				minHeight: "100%",
				background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${product.urlImage})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}>
			<div className="info">
				<span>{product.name}</span>
				<span>${product.price}</span>
			</div>
			<button
				className={`btn ${isInCart ? "btn-secondary" : "btn-primary"} `}
				onClick={handleAddToCart}>
				{isInCart ? "-" : "+"}
			</button>
		</div>
	);
};

export default Product;
