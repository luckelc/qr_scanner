import styles from "@/styles/dist/giveUpForm.module.css";
import React from "react";

export default function GiveUpForm({ canceled, proceeded }) {
	return (
		<div className={styles.giveUpForm}>
			<div className={styles.card}>
				<h2>Vill du ge upp?</h2>
				<ul>
					<li>
						<button type="button" onClick={() => canceled()}>
							Nej
						</button>
					</li>
					<li>
						<button type="button" onClick={() => proceeded()}>
							Ja
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
