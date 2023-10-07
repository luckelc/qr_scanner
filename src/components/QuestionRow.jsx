import styles from '@/styles/index.module.css'
import React from 'react';

function QuestionRow({onClick, question}){
  return (
    <li key={question.id} className={styles.question}>
      <button
        style={question.found? ({backgroundColor: 'white'}) :
          ({backgroundColor: question.color.hex})}
        className={styles.questionButton}
        onClick={() => onClick(question)}
        id={"question" + question.id}
      >
        <h3>{question.name}</h3>
      </button>
    </li>
  );
}

export default QuestionRow;