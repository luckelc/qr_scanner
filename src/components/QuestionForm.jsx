import styles from '@/styles/index.module.css'
import React from 'react';
import QuestionAnswer from '@/components/QuestionAnswer';


function QuestionForm({question}){

  function chooseAnswer(answerChosen){
    question.userInput = answerChosen;

  }


  let answerBlock = []
  question.answers.forEach(ans => {
    <QuestionAnswer answerText={ans} onClick={chooseAnswer}/>
  });
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