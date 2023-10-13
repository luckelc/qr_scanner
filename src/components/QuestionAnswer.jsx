import styles from '@/styles/index.module.css'
import React from 'react';

function QuestionAnswer({onClick, answerText, selected}){
  return (
    <li>
      <button style={selected? {backgroundColor: 'lime'} : {}} className={styles.answer} onClick={selected? undefined : onClick}>
          {answerText}
      </button>
    </li>
  );
}

export default QuestionAnswer;