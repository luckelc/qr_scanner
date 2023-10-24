import styles from '@/styles/index.module.css'
import React from 'react';

function QuestionAnswer({onClick, answerText, selected}){
  return (
    <li>
      <button className={selected? (styles.answer.toString() + " " + styles.selected.toString()) : (styles.answer) } 
       onClick={onClick}
      >
          {answerText}
      </button>
    </li>
  );
}

export default QuestionAnswer;