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
				</div>
				<div>
					<p>Den här appen har utvecklats av en elev.</p>
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
		</div>
	);
}