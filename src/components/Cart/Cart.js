import { useContext } from "react";

import CartContext from "../../store/cart-context";

import styles from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";

const Cart = ({ onHideCart }) => {
	const cartCtx = useContext(CartContext);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
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
	return (
		<Modal onClick={onHideCart}>
			{cartItems}
			<div className={styles.total}>
				<span>Total amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button onClick={onHideCart} className={styles["button-alt"]}>
					Close
				</button>
				{hasItems && <button className={styles.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
