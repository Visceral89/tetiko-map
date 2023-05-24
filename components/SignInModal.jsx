"use client";

import React, { useState } from "react";
import supabase from "../utils/supabaseClient.js";
import styles from "@/styles/modal.module.scss";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const { error } = await supabase.auth.signIn({ email, password });

		if (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<form onSubmit={handleLogin}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type="submit" disabled={loading}>
						{loading ? "Loading..." : "Sign In"}
					</button>
				</form>
				{error && <p>{error}</p>}
			</div>
		</div>
	);
}
