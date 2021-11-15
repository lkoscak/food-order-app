import styles from "./Cart.module.css";

import Modal from "../UI/Modal";

const Cart = ({ onHideCart }) => {
	const cartItems = (
		<ul className={styles["cart-items"]}>
			{[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item) => (
				<li>{item.name}</li>
			))}
		</ul>
	);
	return (
		<Modal onClick={onHideCart}>
			{cartItems}
			<div className={styles.total}>
				<span>Total amount</span>
				<span>35.62</span>
			</div>
			<div className={styles.actions}>
				<button onClick={onHideCart} className={styles["button-alt"]}>
					Close
				</button>
				<button className={styles.button}>Order</button>
			</div>
		</Modal>
	);
};

export default Cart;
