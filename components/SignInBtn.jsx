import styles from "../styles/button.module.scss";
import Image from "next/image";

const SignInBtn = () => {
	return (
		<button className={styles.btn}>
			<Image
				src="/icons/login_black_24dp.svg"
				width={20}
				height={20}
				alt="login icons"
			/>
			Login
		</button>
	);
};

export default SignInBtn;
