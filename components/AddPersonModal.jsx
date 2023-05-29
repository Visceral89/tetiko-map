"use client";

import { useState } from "react";
import styles from "@/styles/modal.module.scss";
import buttonstyle from "../styles/button.module.scss";

const AddPersonModal = ({ onClose }) => {
	const [name, setName] = useState("");
	const [surname, setSurName] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
	}

	return (
		<div className={styles.container} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h1>Add person</h1>
				<form onSubmit={handleSubmit}>
					<input
						placeholder="Name:"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						placeholder="Lastname:"
						type="text"
						value={surname}
						onChange={(e) => setSurName(e.target.value)}
					/>
					<button className={buttonstyle.btn} type="submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddPersonModal;
