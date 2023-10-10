// TODO : Maybe create a state in the context that is a bool about if the useEffect function has fired or not, and then check in this useEffect if it has
'use client';
import React, {useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '@/styles/index.module.css'
import QuestionRow from '@/components/QuestionRow';
import ModuleComponent from '@/components/Module';
import Html5QrcodePlugin from '@/components/Html5QrcodePlugin';
import {getQuestionArray} from '@/components/ContextProvider'

export default function QrScannerHomePage() {
  const [questionData, setQuestionData] = getQuestionArray();
  const [isModuleVisible, setIsModuleVisible] = useState(false);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [selectedQuestionData, setSelectedQuestionData] = useState(null);
  const [questionBlock, setQuestionBlock] = useState([]);

  useEffect(() => {
    if (questionData.length > 0) {
      let temp = []
      for (let i = 0; i < questionData.length; i++) {
        const question = getQuestionHandler(i);
        const questionComponent = (
          <QuestionRow
            key={question.id} // Don't forget to add a unique key
            onClick={toggleModuleVisibilityText}
            question={question}
          />
        );
        temp.push(questionComponent)
      }
      setQuestionBlock(temp)
    }

  }, []);

  function getQuestionHandler(questionIndex) {
    return questionData[questionIndex]
  }

  const toggleModuleVisibilityText = (selectedQuestion) => {
    setIsModuleVisible(true);
    setSelectedQuestionData(selectedQuestion); // Store the selected question data
  };

  return (
    <>
      <Head>
        <title>Qr Scanner</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        {isScannerVisible? (

          <div className="scanner">
            <Html5QrcodePlugin
                removeScanner={setIsScannerVisible}
                questionData={questionData}
            />
          </div>

        ) : (

          <div>
            {isModuleVisible? (<ModuleComponent question={selectedQuestionData} onClick={setIsModuleVisible}/>) : ''}
            <h1 className={styles.h1}>QR Scanning Code</h1>

            <ul>
              {questionBlock}
            </ul>

            <div className={styles.nav}>
              <div className={styles.navGroup}>
                <button onClick={setIsScannerVisible} className={styles.scan}>SCAN</button>
                <button className={styles.give_up}>GIVE UP</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
