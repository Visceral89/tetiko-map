import Image from "next/image";
import styles from "@/styles/page.module.scss";
import Scene from "@/components/Scene";

export default function Home() {
	return (
		<main className={styles.main}>
			<Scene />
		</main>
	);
}
