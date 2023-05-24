import styles from "../styles/navbar.module.scss";
import buttonstyle from "../styles/button.module.scss";
import Image from "next/image";
import SignInBtn from "./SignInBtn";
import SignOutBtn from "./SignOutBtn";

const Navbar = ({ onModalOpen }) => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.navbarItem}>
				<Image
					src="/logos/logo-simple-white.svg"
					alt="tetiko logo"
					width={190}
					height={60}
					className={styles.navBarImg}
				/>
				<h1>Tetiko Platskarta</h1>
			</div>
			<div className={styles.navbarItem}>
				<button className={buttonstyle.btn} onClick={onModalOpen}>
					Add Deltagare
				</button>
				<SignInBtn />
			</div>
		</nav>
	);
};

export default Navbar;
