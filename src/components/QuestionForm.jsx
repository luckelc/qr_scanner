import styles from "@/styles/dist/questionForm.module.css";
import QuestionAnswer from "@/components/QuestionAnswer";
import React, { useState, useEffect, useContext } from "react";
import { QuestionContext } from "@/components/ContextProvider";

export default function QuestionForm({ question, onExit }) {
	const [questionData, setQuestionData] = useContext(QuestionContext);
	const [selectedAnswer, setSelectedAnswer] = useState(question.userInput);

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
						src={"../../public/img/speaking.jpg"}
						alt={"Image of " + question.name}
					/>
				</div>

				<div className={styles.info}>
					<div className={styles.form_content}>
						<h2>{question.question}</h2>
						<ul>
							{question.answers &&
								question.answers.length > 0 &&
								question.answers.map((answer, index) => (
									<QuestionAnswer
										key={index}
										selected={
											answer.text === selectedAnswer
										}
										answerText={answer.text}
										onClick={() =>
											chooseAnswer(answer.text)
										}
									/>
								))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
