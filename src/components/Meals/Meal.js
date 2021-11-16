import { useContext } from "react";

import styles from "./Meal.module.css";

import CartContext from "../../store/cart-context";

import MealForm from "./MealForm";

const Meal = ({ id, name, description, price }) => {
	const { addItem } = useContext(CartContext);

	const formatedPrice = `$${price.toFixed(2)}`;
	const addToCartHandler = (amount) => {
		addItem({
			id,
			name,
			amount,
			price,
		});
	};
	return (
		<li className={styles.meal}>
			<div>
				<h3>{name}</h3>
				<div className={styles.description}>{description}</div>
				<div className={styles.price}>{formatedPrice}</div>
			</div>
			<div>
				<MealForm onAddToCart={addToCartHandler}></MealForm>
			</div>
		</li>
	);
};

export default Meal;
