import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const newTotalAmount =
			state.totalAmount + action.payload.price * action.payload.amount;
		const existingItemIndex = state.items.findIndex(
			(item) => item.id === action.payload.id
		);
		let updatedItems;
		if (existingItemIndex > -1) {
			let updatedItem;
			const existingItem = state.items[existingItemIndex];
			updatedItem = {
				...existingItem,
				amount: existingItem.amount + action.payload.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.payload);
		}
		return { ...state, items: updatedItems, totalAmount: newTotalAmount };
	}
	if (action.type === "REMOVE") {
		const existingItemIndex = state.items.findIndex(
			(item) => item.id === action.payload
		);
		const existingItem = state.items[existingItemIndex];
		const newTotalAmount = state.totalAmount - existingItem.price;

		let updatedItems;
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.payload);
		} else {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = updatedItem;
		}
		return { ...state, items: updatedItems, totalAmount: newTotalAmount };
	}
	if (action === "CLEAR") {
		return defaultCartState;
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCart = (item) => {
		dispatchCartAction({ type: "ADD", payload: item });
	};
	const removeItemFromCart = (id) => {
		dispatchCartAction({ type: "REMOVE", payload: id });
	};
	const clearCartHandler = () => {
		dispatchCartAction({ type: "CLEAR" });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCart,
		removeItem: removeItemFromCart,
		clear: clearCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
