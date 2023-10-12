import styles from '@/styles/index.module.css'
import React from 'react';

function QuestionRow({onClick, question}){
  return (
    <li key={question.id} className={styles.question}>
      <button
        style={question.found? ({backgroundColor: 'white', pointerEvents: 'none'}) :
          ({backgroundColor: question.color.hex})}
        className={styles.questionButton}
        onClick={() => onClick(question)}
        id={"question" + question.id}
      >
        <h3>{question.name}</h3>
        <p>{question.description}</p>
      </button>
    </li>
  );
}

export default QuestionRow;