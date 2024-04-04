import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import styles from './Chat.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import icon from '../../images/emoji.svg';
import EmojiPicker from 'emoji-picker-react';
import Message from './Message';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setClosed } from '../../store/sliceMovie';
import { useAuthApiQuery, useEmailReadMutation } from '../../store/MovieApi';
import { ChatAllResponse } from '../../types';

//@ts-ignore
const socket = io.connect('https://backmovie.onrender.com/');

type Params = {
  [key: string]: string;
  room?: string;
  user?: string;
}  ;

const Chat = () => {
  const click = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [params, setParams] = useState<Params>({ room: '', user: '' });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUser] = useState(0);
  const [history, setHistory] = useState<ChatAllResponse[]>([]);
  const [not, setNot] = useState(false);
  const dispatch = useAppDispatch();
  const [emailRead, { data }] = useEmailReadMutation();
  const emailAll = useAppSelector((state) => state.sliceMovie.emailAll);
  const { data: dataApi } = useAuthApiQuery('');

  useEffect(() => {
    //Имя и комната
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    if (search.includes('main')) {
      dispatch(setClosed(true));
      if (dataApi) {
        if (dataApi.username) {
          const dataInfo = {
            username: dataApi.username,
            //@ts-ignore
            email: emailAll?.length,
          };
          emailRead(dataInfo);
        }
      }
    }
  }, [dataApi]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => [..._state, data]);
      setNot(true);
    });
  }, []);

  useEffect(() => {
    socket.on('joinRoom', ({ data: { users } }) => {
      setUser(users.length);
    });
  }, []);

  useEffect(() => {
    socket.emit('getChatHistory', params.room);
    socket.on('chatHistory', ({ data }) => {
      setHistory(data);
    });
  }, [params.room]);
  const clickIcon = () => {
    click.current.click();
  };

  const leftRoom = () => {
    socket.emit('leftRoom', { params });
    navigate('/');
  };

  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const onEmojiClick = ({ emoji }) => [setMessage(`${message} ${emoji}`)];

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    socket.emit('sendMessage', { message, params });
    setMessage('');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>

        
        <button className={styles.left} onClick={leftRoom}>
          Left room
        </button>
        <div className={styles.users}>{users} users in this room</div>
        <div className={styles.title}></div> 
      </div>

      <div className={styles.messages}>
        <Message messages={state} name={params.name} history={history} />
      </div>

      <form className={styles.form} onSubmit={handleSumbit}>
        <div className={styles.input}>
          <input
            className={styles.inp}
            type="text"
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="What do you want to say?"
          />
        </div>

        <div className={styles.emoji}>
          <img className={styles.imgEmj} onClick={() => setIsOpen(!isOpen)} src={icon} alt="" />
          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className={styles.button}>
          <input
            ref={click}
            style={{ display: 'none' }}
            type="submit"
            onSubmit={handleSumbit}
            value="Send a message"
          />
          <img
            onClick={clickIcon}
            className={styles.btnIcon}
            src="https://visualpharm.com/assets/584/Sent-595b40b85ba036ed117da306.svg"
            alt="ni"
          />
        </div>
      </form>
    </div>
  );
};

export default Chat;
