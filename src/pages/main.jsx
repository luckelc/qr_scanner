'use strict';
import React, {useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '@/styles/index.module.css'
import QuestionRow from '@/components/QuestionRow';
import Html5QrcodePlugin from '@/components/Html5QrcodePlugin';
import { getQuestionArray } from '@/components/ContextProvider';
import QuestionForm from '@/components/QuestionForm';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove, get, child} from "firebase/database";
import MailCollector from '@/components/MailCollector'
import GiveUpForm from '@/components/GiveUpForm';

// User_mail and firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyB0RUhBocGEgEsjD3CPCpNfwz9L813Qge8",
  authDomain: "qr-scanner-ff324.firebaseapp.com",
  databaseURL: "https://qr-scanner-ff324-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "qr-scanner-ff324",
  storageBucket: "qr-scanner-ff324.appspot.com",
  messagingSenderId: "371473474823",
  appId: "1:371473474823:web:f503a1f5d751a55b4291a2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = ref(getDatabase(app), "user_data")
const userObject = {
  "mail": "person@testmail.com",
  "points": "2"
}
export async function GetUserData() {
  try {
    const snapshot = await get(db);

    if (snapshot.exists()) {
      const jsonArray = Object.entries(snapshot.val()).map(([key, value]) => ({ key, value }));
      return jsonArray;
    } else {
      return null; // Returning null to indicate no data
    }
  } catch (error) {
    console.error(error);
    return null; // Returning null in case of an error
  }
}
const localStorageMailKey = 'user_mail'

export default function QrScannerHomePage() {
  const [questionData, setQuestionData] = getQuestionArray();
  const [selectedQuestionData, setSelectedQuestionData] = useState(null);
  const [isQuestionFormVisible, setQuestionFormVisibility] = useState(false);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [isMailCollected, setIsMailColleted] = useState(false);
  const [isGiveUpFormVisible, setGiveUpFormVisibility] = useState(false)
  const [isAllQuestionsAnswered, setAllQuestionsAnswered] = useState(false)

  const handleSendEmail = async () => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type as JSON
        },
        body: JSON.stringify({}), // You can send data in the request body if needed
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log('Email sent successfully');
        } else {
          console.error('Email sending failed');
        }
      } else {
        console.error('Email sending failed');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  function SetUserMail(user_mail){
    setIsMailColleted(true)
    localStorage.setItem(localStorageMailKey, user_mail);
    handleSendEmail();
  }

  const toggleQuestionFormVisibilityText = (selectedQuestion) => {
    setQuestionFormVisibility(true);
    setSelectedQuestionData(selectedQuestion); // Store the selected question data
  };

  const questionRows = questionData.map((question, index) => (
    <QuestionRow
    key={index}
    onClick={toggleQuestionFormVisibilityText}
    question={question}
    />
  ))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the stored mail, if there is one.
      const storedData = localStorage.getItem(localStorageMailKey);
      setIsMailColleted(storedData && storedData);
      if(isMailCollected)
        console.log('The mail is ' + isMailCollected);

      // Fetch the mail data
      const fetchData = async () => {
        const user_data = await GetUserData();
        if (user_data) {
          let keyFound = false; // Initialize a flag
          for (const userData of user_data) {
            if (userObject.mail === userData.value.mail) {
              keyFound = true;
              break; // Exit the loop when a matching key is found
            }
          }
          if (keyFound) {
            console.log('There is already a key with that value');
            console.log(user_data);
          } else {
            push(db, userObject);
            console.log('Pushed a key');
          }
        }else{
          // No user_data indicates that the array isn't there, in that case you could still push it up.
          push(db, userObject);
          console.log('Pushed a key');
        }
      }
      fetchData();

    }
  }, []);

  useEffect(() => {
    if (questionData.length > 0) {
      const allFound = questionData.every(obj => obj.hasOwnProperty('found') && obj.found === true);
      if(allFound){
        console.log('You found them all!!!')
      }
    }
  }, [questionData]);

  return (
    <>
      <Head>
        <title>Qr Scanner</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.main}>
        <div className={styles.main_nav}>

          {isScannerVisible? (

            <button id='go_back' className={styles.go_back}>
              <svg height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M5 12L11 6M5 12L11 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

          ) : (
            <div></div>
          )}

          <button className={styles.give_up} onClick={() => setGiveUpFormVisibility(true)}>
            <svg height="800px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#FFFFFF"/>
            </svg>
          </button>
        </div>
        
        {isGiveUpFormVisible &&  
          (
          <GiveUpForm canceled={() => setGiveUpFormVisibility(false)} proceeded={() => console.log('They gave up')}/>
          )
        }

        {!isMailCollected && 
          (
            <MailCollector onSubmit={SetUserMail} />
          )
        }

        {isScannerVisible? (

          <div className={`${styles.scanner} ${styles.content}`}>
            <Html5QrcodePlugin
                removeScanner={() => setIsScannerVisible(false)}
                questionData={questionData}
            />
          </div>
        ) : (
          <div className={styles.content}>
            {isQuestionFormVisible && (<QuestionForm onExit={() => setQuestionFormVisibility(false)} question={selectedQuestionData}/>)}
            <div className={styles.temp}>
              <h1 className={styles.h1}>QR Scanning Code</h1>

              <ul>
                {questionRows}
              </ul>
            </div>

            <div className={styles.nav}>
              <div className={styles.navGroup}>

                {isAllQuestionsAnswered? 
                  <button onClick={setIsScannerVisible} className={styles.scan}>SCAN</button> 
                  :
                  // Change the class to its own, or create a general name that can be applied to both buttons
                  <button onClick={() => console.log("You sent in your form")} className={styles.scan}>SEND IN</button> 
                }

              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}
