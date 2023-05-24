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
					<button className={buttonstyle.btn} type="submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddPersonModal;
