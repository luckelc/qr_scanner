import styles from '@/styles/index.module.css'
import React, { useEffect, useState }  from 'react';
import QuestionAnswer from '@/components/QuestionAnswer';
import {getQuestionArray} from './ContextProvider';


function QuestionForm({question, onExit}){
  const [questionData, setQuestionData] = getQuestionArray();
  const [selectedAnswer, setSelectedAnswer] = useState(question.userInput);

  let answerBlock = []
  for (let i = 0; i < question.answers.length; i++) {
    answerBlock.push(<QuestionAnswer key={i} selected={(question.answers[i].text === selectedAnswer)} answerText={question.answers[i].text} onClick={() => chooseAnswer(question.answers[i].text)}/>)
  }

  function chooseAnswer(answerChosen){

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
    setSelectedAnswer(answerChosen)
    onExit()
  }

  return (
    <div className={styles.questionForm}>
      <div className={styles.card}>
        <div className={styles.cover}>
          <img src={"/img/speaking.jpg"} alt={'Image of ' + question.name}/>
        </div>

        <div className={styles.info}>
          <div className={styles.form_content}>
            <h2>{question.question}</h2>
            <ul>
              {answerBlock}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;