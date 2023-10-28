import styles from "@/styles/dist/finishScreen.module.css"
import React from "react";

export default function FinishScreen() {
	return (
		<div className={styles.finishScreen}>
			<div className={styles.card}>
				<h2>Du klarade quizen! Håll utkik i på mailet påde i inboxen och i spam, för återkopplande om priset.</h2>
			</div>
		</div>
	);
}
