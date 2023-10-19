import styles from '@/styles/index.module.css'
import React from 'react';

function MailCollector({onSubmit}){

  function CheckMailInput(){
    let user_input = document.getElementById('mail_form').value
    if(user_input){
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
      if(emailPattern.test(user_input)){
        onSubmit(user_input)
      }else{
        console.log("Wrong email, enter a valid option")
      }
    }
  }

  return (
    <div className={styles.mailForm}>
      <div className={styles.card}>
        <form>
          <label htmlFor='mail_form'>Enter your mail:</label>
          <input type="email" name="User mail" id="mail_form" />
          <button type='button' className={styles.accept_form} onClick={CheckMailInput}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default MailCollector;