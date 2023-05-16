import Image from "next/image";
import styles from "@/styles/page.module.scss";
import Login from "@/components/Login";

import supabase from "@/utils/supabase.js";

async function fetchData() {
	let { data: users, error } = await supabase.from("users").select("*");

	if (error) console.log("Error: ", error);
	else console.log("Users: ", users);
}

fetchData();

export default function Home() {
	return (
		<main className={styles.main}>
			<Login />
		</main>
	);
}
