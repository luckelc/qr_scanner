'use client';
import React, {useState} from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import styles from './page.module.css';
import questions from './questions.json'

function App() {
  const [showElement, setShowElement] = useState(false);
  const [questionInfo, setQuestionInfo] = useState('Test text');

  const goBack = (event) => {
    setShowElement(false);
  };

  function moduleCode(questionName, questionImageUrl, questionDesc) {
    return (
      <div className={styles.module}>
        <div>
          <div className={styles.go_back} onClick={goBack}></div>
          <h2>{questionName}</h2>
        </div>
      </div>
    );
  } 

  const handleQuestionClick = (el) => {
    const elementKey = el.target.id.split('question')[1];
    console.log('Clicked element:', el.target.id);

    questions.questions.forEach((question) => {
      if(elementKey == question.id){
        console.log("YES");
        setQuestionInfo(moduleCode(question.name, "", question.description));
        setShowElement(true);
        return;
      }
    })
  };

  var questionList = []
  questions.questions.forEach((e) => {
    questionList.push(
    <li key={e.id} className={styles.question}>
      <div style={{backgroundColor: e.color.hex}} onClick={handleQuestionClick} id={'question' + e.id}>
        <h3>{e.question}</h3>
      </div>
    </li>)
  })

  return (

    <div className={styles.app}>
      {showElement? (questionInfo) : ''}

      <div id="show-question"></div>
      <h1 className={styles.h1}>QR Scanning Code</h1>

      <ul>
        {questionList}
      </ul>

      <div className={styles.nav}>
        <div className={styles.navGroup}>
          <div className={styles.scan}>SCAN</div>
          <div className={styles.give_up}>GIVE UP</div>
        </div>
      </div>
    </div>
  );
}

export default App;