import styles from '@/styles/index.module.css'
import React, { useEffect }  from 'react';
import QuestionAnswer from '@/components/QuestionAnswer';


function QuestionForm({question, onExit}){

  function chooseAnswer(answerChosen){
    question.userInput = answerChosen;
    question.found = true;
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