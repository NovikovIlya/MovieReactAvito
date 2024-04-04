import React from 'react'
import styles from './Messages.module.scss';

const Message = ({messages,name,history}) => {
  return (
    <div className={styles.messages}>
      {history.map(({sender,text,date,time},index)=>{
        const itsMe = sender.trim().toLowerCase() === name.trim().toLowerCase()
        const className = itsMe ? styles.me : styles.user;
        return(
          <div key={index} className={`${styles.message} ${className}`}>
              <span className={styles.user}>
                  {sender}
              </span>
              <div className={styles.text}>
                  {text && text}
                  <div className={styles.MainDate}>
                    <div className={styles.date}>{ date && date}</div>
                    <div className={styles.date}> {time && time}</div>
                  </div>
              </div>
          </div>
        )
      })
      }
        {messages.map(({user,message,chatMessage},index)=>{
          const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase()
          const className = itsMe ? styles.me : styles.user;
          return(
            <div key={index} className={`${styles.message} ${className}`}>
                <span className={styles.user}>
                    {user.name}
                </span>
                <div className={styles.text}>
                    {message.length>0 && message}
                    <div className={styles.MainDate}>
                    <div className={styles.date}>{ chatMessage?.date}</div>
                    <div className={styles.date}> {chatMessage?.time}</div>
                  </div>
                </div>
            </div>
          )
        })}
    </div>
  )
}

export default Message