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

/*

Funtionalitet:

- Skriva in en deltagare på en plats. {klicka på platsen och fylla i namn och arrive time och depart time}
- Ta bort deltagaren från en plats. {klicka på platsen och ett litet kryss, eller möjlghet att redigera uppgifter.}
-- ifall platsen är tagen av en annan vid samma tid skall det inte gå att lägga till en person under samma tid.
- Visa lediga plater { Borden färgas av antingen Vit Gul eller Röd, Vit betyder att platsen är helt ledig. Gul betyder att platsen är delvis ledig under dagen. Röd är helt bokad plats. }

*/
