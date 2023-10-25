import styles from "@/styles/dist/main.module.css";
import React from "react";

export default function GiveUpForm({ canceled, proceeded }) {
	return (
		<div className={styles.giveUpForm}>
			<div className={styles.card}>
				<h2>Would you like to give up?</h2>
				<ul>
					<li>
						<button type="button" onClick={() => canceled()}>
							Cancel
						</button>
					</li>
					<li>
						<button type="button" onClick={() => proceeded()}>
							Proceed
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
