"use client";

// I dont have metadata!

import "./globals.css";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import AddPersonModal from "@/components/AddPersonModal";
import { useState } from "react";

const robot = Roboto({
	subsets: ["latin"],
	weight: ["100", "300", "400", "500", "700", "900"],
	style: ["italic", "normal"],
});

export default function RootLayout({ children }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	function openModal() {
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	return (
		<html lang="en">
			<body className={robot.className}>
				<Navbar onModalOpen={openModal} />
				{isModalOpen && <AddPersonModal onClose={closeModal} />}
				{children}
			</body>
		</html>
	);
}
