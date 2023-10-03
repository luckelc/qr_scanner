import styles from '@/styles/index.module.css'

function ModuleComponent({onClick, question}){

  let hasImages = true;
  return (
    <div className={styles.module}>
      <div>
        <div className={styles.go_back} onClick={() => onClick(false)}></div>
        <div className={styles.info}>
          <h2>{question.name}</h2>
          <p>{question.description}</p>
          {hasImages? (<img src={"/img/speaking.jpg"} alt={'Image of ' + question.name}/>) : ""}
        </div>
      </div>
    </div>
  );
}

export default ModuleComponent;