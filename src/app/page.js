'use client';
import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import styles from './page.module.css';
import questions from './questions.json'

function App() {

  const handleQuestionClick = (event) => {
    const clickedElement = event.target.id;
    console.log('Clicked element:', clickedElement);
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