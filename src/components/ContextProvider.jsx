import React, {useContext, useState, useEffect} from 'react';
import questions from "@/questions.json";

const QuestionContext = React.createContext();
const localStorageKey = 'questionsData';

export function getQuestionArray(){
  return useContext(QuestionContext)
}

export default function ContextProvider({children}){
  const [questionData, setQuestionData] = useState(questions.questions);


  // Set the questionData to the default questions.questions data if there isn't any saved data in localStorage
  useEffect(() => {
    const storedData = localStorage.getItem(localStorageKey);
    const initialData = storedData? JSON.parse(storedData) : questions.questions;
    setQuestionData(initialData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(questionData));
    console.log(questionData);
  }, [questionData]);

  return (
    <QuestionContext.Provider value={[questionData, setQuestionData]}>
      {children}
    </QuestionContext.Provider>
  );
}