import styles from "@/styles/dist/main.module.css";
import React from "react";
import studentsNumber from "@/studentsNumber.json";

export default function SubmitForm({submissionPoints}) {

	function CheckInput(){
		const userInput = Number(document.getElementById('integer').value);
		if(Number.isInteger(userInput)){
			if(userInput >= 0){
				const difference = Math.abs(userInput - studentsNumber.amount);
				submissionPoints(difference)
			}else{
				alert('Please enter a realistic number.')
			}
		}else{
			alert('Please enter a number instead.')
		}
	}
	

	return (
		<div className={styles.giveUpForm}>
			<div className={styles.card}>
				<h2>Hur många elever går på Nösnäsgymnasiet under läsåret 23/24? </h2>
				<form>
					<label htmlFor="integer">Enter an integer:</label>
					<input type="number" id="integer" name="integer" step="1"/>
					<button
						type="button"
						className={styles.submit_form}
						onClick={() => CheckInput()}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
