import React, {useContext, useState} from 'react';

export const QuestionContext = React.createContext();
export const QuestionUpdateContext  = React.createContext();

export function useQuestionData(){
  return useContext(QuestionContext)
}

export function useQuestionDataUpdate(){
  return useContext(QuestionUpdateContext)
}

export default function QuestionProvider({children}){
  const [questionData, setQuestionData] = useState(questions.questions);

  useEffect(() => {
    const storedData = localStorage.getItem('questionsData');
    const initialData = storedData ? JSON.parse(storedData) : questions.questions;
    setQuestionData(initialData);
  }, []);

  return (
    <QuestionContext.Provider value={{questionData, setQuestionData}}>
      {children}
    </QuestionContext.Provider>
  );
}