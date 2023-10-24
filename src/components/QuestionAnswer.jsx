import styles from '@/styles/dist/questionForm.module.css'
import React from 'react';

function QuestionAnswer({onClick, answerText, selected}){
  return (
    <li>
      <button className={selected? `${styles.answer} ${styles.selected}` : styles.answer} 
       onClick={onClick}
      >
          {answerText}
      </button>
    </li>
  );
}

export default QuestionAnswer;