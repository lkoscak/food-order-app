import mealsImage from "../../assets/meals.jpg";
import styles from "./Header.module.css";

import HeaderCartButton from "./HeaderCartButton";

const Header = ({ onShowCart }) => {
	return (
		<>
			<header className={styles.header}>
				<h1>React meals</h1>
				<HeaderCartButton onClick={onShowCart}></HeaderCartButton>
			</header>
			<div className={styles["main-image"]}>
				<img src={mealsImage} alt="A table full of delicious food!"></img>
			</div>
		</>
	);
};

export default Header;
