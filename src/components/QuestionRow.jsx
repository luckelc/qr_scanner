'use client';
import styles from '@/styles/index.module.css'
import React, {useState} from 'react';

const QuestionRow = (questionObject)  => {
  
  const [showModule, setShowModule] = useState(false);
  const question = questionObject.question;

  const handleQuestionClick = (e) => {
      const elementKey = e.target.id.split('question')[1];
      console.log('Clicked element:', e.target.id);
      setShowQuestion
  };
  //question.color.hex
  
  return (
    <li key={question.id} className={styles.question}>
      <button
       className={styles.questionButton}
        onClick={(e) => handleQuestionClick(e)}
        id={"question" + question.id}
      >
        <h3>{question.name}</h3>
      </button>
    </li>
  );
}

export default QuestionRow;