import styles from "@/styles/dist/mailForm.module.css";
import React from "react";

export default function MailCollector({ onSubmit }) {
	function CheckMailInput() {
		let user_input = document.getElementById("mail_form").value;
		if (user_input) {
			const emailPattern =
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
			if (emailPattern.test(user_input)) {
				onSubmit(user_input);
			} else {
				console.log("Wrong email, enter a valid option");
			}
		}
	}

	return (
		<div className={styles.mailForm}>
			<div className={styles.card}>
				<div className={styles.logo}>
					<img src="/external_design/nosnas_logo.svg" alt="" />
					<h2>NÖSNÄS</h2>
				</div>
				
				<form>
					<label htmlFor="mail_form">Skriv in ditt mail för att fortsätta:</label>
					<input type="email" name="User mail" id="mail_form" />
					<button
						type="button"
						className={styles.accept_form}
						onClick={() => CheckMailInput()}
					>
						Fortsätt
					</button>
				</form>
			</div>
			<div className={styles.about}>
					<p>Den här appen har utvecklats av <span>en elev.</span></p>
					<p>Vi värdesätter din integritet. I enlighet med GDPR lagrar vi inte personlig information. Vi använder endast nödvändiga cookies för att förbättra din upplevelse på vår webbplats.</p>
				</div>
		</div>
	);
}