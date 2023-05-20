import "./globals.css";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";

const robot = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata = {
	title: "Tetiko Map",
	description: "A dynamic map of room placement",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={robot.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
