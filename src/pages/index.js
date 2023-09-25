'use client';
import React, {useState} from 'react';
import QrScanner from 'qr-scanner';
import questions from '@/questions.json';
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/index.module.css'

export default function Home() {
  const [showModule, setShowModule] = useState(false);
  const [showQrScanner, setQrScanner] = useState(false);
  const [questionInfo, setQuestionInfo] = useState('Test text');
  console.log(QrScanner)

  const goBack = (event) => {
    setShowModule(false);
  };

  function moduleCode(questionName, questionImageUrl, questionDesc) {
    let hasImages = false;
    if(questionImageUrl != "" && questionImageUrl != null){
      hasImages = true
    }
    return (
      <div className={styles.module}>
        <div>
          <div className={styles.go_back} onClick={goBack}></div>
          <div className={styles.info}>
            <h2>{questionName}</h2>
            <p>{questionDesc}</p>
            {hasImages? (<img src={questionImageUrl} alt={'Image of ' + questionName}/>) : ""}
          </div>
        </div>
      </div>
    );
  } 

  const handleQuestionClick = (el) => {
    const elementKey = el.target.id.split('question')[1];
    console.log('Clicked element:', el.target.id);

    questions.questions.forEach((question) => {
      if(elementKey == question.id){
        setQuestionInfo(moduleCode(question.name, './img/speaking.jpg', question.description));
        setShowModule(true);
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
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {showModule? (questionInfo) : ''}
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
      </main>
    </>
  )
}
