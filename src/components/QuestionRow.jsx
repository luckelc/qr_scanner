import styles from '@/styles/dist/question.module.css'
import React from 'react';

function QuestionRow({onClick, question}){
  return (
    <li key={question.id} className={styles.question}>
      <button
        style={question.found? ({pointerEvents: 'initial'}) :
          ({pointerEvents: 'none'})}
        className={question.found? (styles.questionButton.toString() + " " + styles.answered.toString()) : (styles.questionButton)}
        onClick={() => onClick(question)}
        id={"question" + question.id}
      >
        <div className={styles.info}>
          <h3>{question.name}</h3>
          <p>{question.description}</p>
        </div>
      </button>
    </li>
  );
}

export default QuestionRow;