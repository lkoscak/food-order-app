import { useState, useRef } from "react";

import styles from "./MealForm.module.css";

import Input from "../UI/Input";

const MealForm = (props) => {
	const [amountIsValid, setamountIsValid] = useState(true);
	const amountInputRef = useRef(null);

	const submitHandler = (e) => {
		e.preventDefault();
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountAsNumber = +enteredAmount;
		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountAsNumber <= 0 ||
			enteredAmountAsNumber > 5
		) {
			setamountIsValid(false);
			return;
		}
		amountInputRef.current.value = null;
		props.onAddToCart(enteredAmountAsNumber);
	};
	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: "amount",
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					default: "1",
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
		</form>
	);
};

export default MealForm;
