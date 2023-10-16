import styles from '@/styles/index.module.css'
import React from 'react';

function QuestionRow({onClick, question}){
  return (
    <li key={question.id} className={styles.question}>
      <button
        style={question.found? ({backgroundColor: question.color.hex, pointerEvents: 'initial'}) :
          ({backgroundColor: question.color.hex, pointerEvents: 'none'})}
        className={styles.questionButton}
        onClick={() => onClick(question)}
        id={"question" + question.id}
      >
        {question.found? (
          <div className={styles.checkmark}>
            <svg viewBox="0 0 36 36" aria-hidden="true" role="img">
              <path fill="#31373D" d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z"></path>
            </svg>
          </div>
        ) : (
          ''
        )}
        <div className={styles.info}>
          <h3>{question.name}</h3>
          <p>{question.description}</p>
        </div>
      </button>
    </li>
  );
}

export default QuestionRow;