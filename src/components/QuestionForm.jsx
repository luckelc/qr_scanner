import styles from "@/styles/dist/questionForm.module.css";
import React, { useState } from "react";
import QuestionAnswer from "@/components/QuestionAnswer";
import { getQuestionArray } from "./ContextProvider";

export default function QuestionForm({ question, onExit }) {
	const [questionData, setQuestionData] = getQuestionArray();
	const [selectedAnswer, setSelectedAnswer] = useState(question.userInput);

	const answers = question.answers.map((answer, index) => (
		<QuestionAnswer
			key={index}
			selected={answer.text === selectedAnswer}
			answerText={answer.text}
			onClick={() => chooseAnswer(answer.text)}
		/>
	));

	function chooseAnswer(answerChosen) {
		const updatedQuestions = questionData.map((q) => {
			if (q.id === question.id) {
				// Clone the question object to avoid direct mutation
				return {
					...q,
					userInput: answerChosen,
					found: true,
				};
			}
			return q;
		});

		setQuestionData(updatedQuestions);
		setSelectedAnswer(answerChosen);
		onExit();
	}

	return (
		<div className={styles.questionForm}>
			<div className={styles.card}>
				<div className={styles.cover}>
					<img
						src={"/img/speaking.jpg"}
						alt={"Image of " + question.name}
					/>
				</div>

				<div className={styles.info}>
					<div className={styles.form_content}>
						<h2>{question.question}</h2>
						<ul>{answers}</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
