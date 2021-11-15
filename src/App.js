import { useState } from "react";

import CartProvider from "./store/cart-provider";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
	const [cartVisible, setCartVisible] = useState(false);

	const toogleCart = (visibility) => {
		setCartVisible(visibility);
	};

	return (
		<CartProvider>
			{cartVisible && <Cart onHideCart={toogleCart.bind(null, false)}></Cart>}
			<Header onShowCart={toogleCart.bind(null, true)}></Header>
			<main>
				<Meals></Meals>
			</main>
		</CartProvider>
	);
}

export default App;
