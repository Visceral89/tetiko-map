import Image from "next/image";
import styles from "@/styles/page.module.scss";
import Login from "@/components/Login";

export default function Home() {
	return (
		<main className={styles.main}>
			<Login />
		</main>
	);
}
