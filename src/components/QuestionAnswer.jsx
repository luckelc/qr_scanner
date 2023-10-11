import styles from '@/styles/index.module.css'
import React from 'react';

function QuestionAnswer({onClick, answerText}){
  return (
    <li>
      <button className={styles.answer} onClick={() => onClick(answerText)}>
          {answerText}
      </button>
    </li>
  );
}

export default QuestionAnswer;