"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import AddPersonModal from "@/components/AddPersonModal";
import { useState } from "react";

const robot = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata = {
	title: "Tetiko Map",
	description: "A dynamic map of room placement",
};

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
