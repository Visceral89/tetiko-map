import styles from "../styles/navbar.module.scss";
import SignInBtn from "./SignInBtn";
import SignOutBtn from "./SignOutBtn";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.navbarItem}>Tetiko Platskarta</div>
			<div>
				<SignInBtn />
			</div>
		</nav>
	);
};

export default Navbar;
