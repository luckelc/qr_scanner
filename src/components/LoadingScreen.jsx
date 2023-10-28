import styles from "@/styles/dist/loadingScreen.module.css"
import React from "react";

export default function LoadingScreen() {
	return (
		<div className={styles.loadingScreen}>
			<div className={styles.card}>
				<div className={styles.loader}></div>
			</div>
		</div>
	);
}
