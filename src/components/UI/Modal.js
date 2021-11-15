import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Backdrop = ({ onClick }) => {
	return <div onClick={onClick} className={styles.backdrop}></div>;
};

const ModalOverlay = (props) => {
	return (
		<div className={styles.modal}>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};

const modalParentElement = document.querySelector("#overlays");

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClick={props.onClick}></Backdrop>,
				modalParentElement
			)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				modalParentElement
			)}
		</>
	);
};

export default Modal;
