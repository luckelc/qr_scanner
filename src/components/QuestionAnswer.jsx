import styles from '@/styles/index.module.css'
import React from 'react';

function QuestionAnswer({onClick, answerText}){
  return (
    <button className={styles.answer} onClick={() => onClick(answerText)}>
        {answerText}
    </button>
  );
}

export default QuestionAnswer;