import { useEffect, useState } from "react";

import styles from "./AvailableMeals.module.css";

import Meal from "./Meal";
import Card from "../UI/Card";

const AvailabelMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				"https://food-order-app-6fcc1-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
			);
			if (!response.ok) {
				throw new Error("Something went wrong while fetching meals!");
			}
			const responseData = await response.json();
			const loadedMeals = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}
			setMeals(loadedMeals);
			setIsLoading(false);
		};
		fetchMeals().catch((error) => {
			setIsLoading(false);
			setError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={styles["meals-loading"]}>
				<p>Loading...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className={styles["meals-error"]}>
				<p>{error}</p>
			</section>
		);
	}
	const mealsList = meals.map((meal) => (
		<Meal
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		></Meal>
	));
	return (
		<section className={styles.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailabelMeals;
