import { useEffect, useState, useCallback } from "react";

import useHttp from "../../hooks/use-http";

import styles from "./AvailableMeals.module.css";

import Meal from "./Meal";
import Card from "../UI/Card";

const AvailabelMeals = () => {
	const [meals, setMeals] = useState([]);

	const handleMeals = useCallback((responseData) => {
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
	}, []);

	const [fetchMeals, isLoading, error] = useHttp();

	useEffect(() => {
		fetchMeals(
			{
				url: "https://food-order-app-6fcc1-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
			},
			handleMeals
		);
	}, [fetchMeals, handleMeals]);

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
