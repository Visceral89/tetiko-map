"use client";

import Image from "next/image";
import styles from "@/styles/page.module.scss";
import SignIn from "@/components/SignIn.jsx";
import supabase from "../utils/supabaseClient.js";
import { useEffect, useState } from "react";

export default function Home() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const sessionUser = supabase.auth.user();

		setUser(sessionUser);

		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				const currentUser = session ? session.user : null;
				setUser(currentUser);
			}
		);
		return () => {
			authListener.unsubscribe();
		};
	}, []);

	if (!user) {
		return <SignIn />;
	}

	return <main className={styles.main}>Hello</main>;
}
