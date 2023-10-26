import React, { useContext, useState, useEffect } from "react";
import questions from "@/questions.json";
import useLocalStorage from '@/components/LocalStorageHook'

export const QuestionContext = React.createContext();

export const localStorageKey = "questionsData";

export default function ContextProvider({ children }) {
	const [questionData, setQuestionData] = useLocalStorage(localStorageKey, questions.questions);

	return (
		<QuestionContext.Provider value={[questionData, setQuestionData]}>
			{children}
		</QuestionContext.Provider>
	);
}
