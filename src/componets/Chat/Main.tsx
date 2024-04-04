import React, { useState } from 'react';
import styles from './Main.module.scss';
import { Link } from 'react-router-dom';

const Main = () => {
  const [values, setValues] = useState({ username: '', room: '' });

  const handleChange = ({target:{value,name}})=>{
    setValues({...values,[name]:value})
  }
  const handleClick = ()=>{
    
  }
  return (
    <div className={styles.container}>
      <div>Main</div>
      <form>
        <div>
          <input type="text" name="username" value={values.username} onChange={handleChange} placeholder="Username" />
        </div>
        <div>
          <input type="text" name="room" value={values.room} onChange={handleChange} placeholder="Room" />
        </div>
        <Link onClick={handleClick} to={`/chat?name=${values.username}&room=${values.room}`}>
          <button type="submit">Sign in</button>
        </Link>
      </form>
    </div>
  );
};

export default Main;
