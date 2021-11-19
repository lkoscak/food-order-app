import { useContext, useState } from "react";

import useHttp from "../../hooks/use-http";
import CartContext from "../../store/cart-context";

import styles from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onHideCart }) => {
	const [isCheckout, setisCheckout] = useState(false);
	const [submitOrder, isLoading] = useHttp();
	const cartCtx = useContext(CartContext);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const orderHandler = () => {
		setisCheckout(true);
	};
	const submitOrderHandler = async (userData) => {
		submitOrder({
			url: "https://food-order-app-6fcc1-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
			method: "POST",
			body: {
				user: userData,
				orderedItems: cartCtx.items,
			},
		});
		onHideCart();
		cartCtx.clear();
	};
	const cartItems = (
		<ul className={styles["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					description={item.description}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				></CartItem>
			))}
		</ul>
	);

	const modalActions = (
		<div className={styles.actions}>
			<button onClick={onHideCart} className={styles["button-alt"]}>
				Close
			</button>
			{hasItems && (
				<button className={styles.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<>
			{cartItems}
			<div className={styles.total}>
				<span>Total amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout
					onCancel={() => {
						setisCheckout(false);
					}}
					onConfirm={submitOrderHandler}
				/>
			)}
			{!isCheckout && modalActions}
		</>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	return (
		<Modal onClick={onHideCart}>
			{!isLoading && cartModalContent}
			{isLoading && isSubmittingModalContent}
		</Modal>
	);
};

export default Cart;
