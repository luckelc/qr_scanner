import styles from '@/styles/index.module.css'
import React, { useEffect }  from 'react';
import QuestionAnswer from '@/components/QuestionAnswer';
import {getQuestionArray, localStorageKey} from './ContextProvider';


function QuestionForm({question, onExit}){
  const [questionData, setQuestionData] = getQuestionArray();

  function chooseAnswer(answerChosen){
      // Create a new array by mapping over the questionData
    const updatedQuestions = questionData.map((q) => {
      // Check if the current question matches your condition
      if (q === question) {
        // Clone the question object to avoid direct mutation
        const updatedQuestion = { ...q };
        updatedQuestion.userInput = answerChosen;
        updatedQuestion.found = true;
        return updatedQuestion;
      }
      return q; // For questions that don't match the condition, return as is
    });

    // Update the state with the modified questionData
    setQuestionData(updatedQuestions);
    onExit()
  }

  console.log(question)
  let answerBlock = []
  for (let i = 0; i < question.answers.length; i++) {
    answerBlock.push(<QuestionAnswer key={i} answerText={question.answers[i].text} onClick={chooseAnswer}/>)
  }
  let hasImages = true;

  return (
    <div className={styles.questionForm}>
      <div>
        <div className={styles.info}>
          <h2>{question.question}</h2>
          <ul>
            {answerBlock}
          </ul>
          {hasImages? (<img src={"/img/speaking.jpg"} alt={'Image of ' + question.name}/>) : ""}
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;