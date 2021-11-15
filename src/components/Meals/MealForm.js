import styles from "./MealForm.module.css";

import Input from "../UI/Input";

const MealForm = () => {
	return (
		<form className={styles.form}>
			<Input
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
		</form>
	);
};

export default MealForm;
