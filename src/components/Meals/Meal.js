import styles from "./Meal.module.css";

import MealForm from "./MealForm";

const Meal = ({ name, description, price }) => {
	const formatedPrice = `$${price.toFixed(2)}`;
	return (
		<li className={styles.meal}>
			<div>
				<h3>{name}</h3>
				<div className={styles.description}>{description}</div>
				<div className={styles.price}>{formatedPrice}</div>
			</div>
			<div>
				<MealForm></MealForm>
			</div>
		</li>
	);
};

export default Meal;
