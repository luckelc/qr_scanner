import styles from "@/styles/dist/submitForm.module.css";
import React from "react";
import studentsNumber from "@/studentsNumber.json";

const maximumGuess = 9999;
const minimumGuess = 0;

export default function SubmitForm({submissionPoints}) {

	function CheckInput(){
		const userInput = Number(document.getElementById('integer').value);
		if(Number.isInteger(userInput)){
			if(userInput < maximumGuess && userInput > minimumGuess){
				const difference = Math.abs(userInput - studentsNumber.amount);
				submissionPoints(difference)
			}else{
				alert('Please enter a realistic number.')
			}
		}else{
			alert('Please enter a number.')
		}
	}
	

	return (
		<div className={styles.submitForm}>
			<div className={styles.card}>
				<h1>Utslagsfråga!</h1>
				<h2>Hur många elever går på Nösnäsgymnasiet under läsåret 23/24? </h2>
				<form className={styles.form}>
					<label htmlFor="integer">Skriv ett nummer:</label>
					<input type="number" id="integer" name="integer" step="1" defaultValue="0" min="0" max="9999"/>
					<button
						type="button"
						className={styles.submit_form}
						onClick={() => CheckInput()}
					>
						SKICKA IN
					</button>
				</form>
			</div>
		</div>
	);
}
