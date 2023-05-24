"use client";

import { useState } from "react";
import styles from "@/styles/modal.module.scss";

const AddPersonModal = () => {
	const [name, setName] = useState("");
	const [surname, setSurName] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<div className={styles.modal}>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label>
					Surname:
					<input
						type="text"
						value={surname}
						onChange={(e) => setSurName(e.target.value)}
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default AddPersonModal;
