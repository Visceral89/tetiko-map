import styles from "../styles/navbar.module.scss";
import Image from "next/image";
import SignInBtn from "./SignInBtn";
import SignOutBtn from "./SignOutBtn";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<Image
				scr="/logos/tetiko.png"
				alt="tetiko logo"
				width={372}
				height={121}
			/>
			<div className={styles.navbarItem}>Tetiko Platskarta</div>
			<div>
				<SignInBtn />
			</div>
		</nav>
	);
};

export default Navbar;
