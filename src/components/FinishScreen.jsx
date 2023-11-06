import styles from "@/styles/dist/finishScreen.module.css"
import React from "react";

export default function FinishScreen() {
	return (
		<div className={styles.finishScreen}>
			<div className={styles.card}>
				<h2>Du lyckades med quizen! Var noga med att kolla både din inkorg och skräppost för feedback om priset.</h2>
			</div>
		</div>
	);
}
