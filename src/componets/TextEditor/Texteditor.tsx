import { Button, Select, message } from 'antd';
import 'easymde/dist/easymde.min.css';
import { useMemo, useState } from 'react';
import { SimpleMdeReact } from 'react-simplemde-editor';
import { useAppDispatch } from '../../hooks/redux';
import { useAddCommentMutation, useAuthApiQuery } from '../../store/MovieApi';
import { addTextComment } from '../../store/sliceMovie';
import styles from './Texteditor.module.scss';

const Texteditor = ({ id }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [valueSelect, setValueSelect] = useState(true);
  const [valueZ, setValueZ] = useState('');
  const { data: dataApi } = useAuthApiQuery('');
  const [AddCommentApi] = useAddCommentMutation();
  const dispatch = useAppDispatch();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'You must enter text!',
    });
  };
  const success = () => {
    messageApi.open({
      type: 'success',
      content:
        'Your message has been sent! After passing moderation, the message will appear! (Approximately 30 seconds)',
    });
  };
  const onChange = (value: string) => {
    setValueZ(value);
  };
  const handleCreate = async () => {
    const title = valueZ;
    const name = dataApi.username;
    if (name === '' || title === '') {
      error();
      return;
    }
    await AddCommentApi({
      imdbid: id,
      body: [
        {
          postId: 10,
          name: name,
          text: title,
          like: valueSelect,
          date: new Date().toISOString().slice(0, 10).split('-').reverse().join('.'),
        },
      ],
    });
    success();
    dispatch(addTextComment(''));
    setValueZ('');
  };
  const handleChange = (value: string) => {
    const zero = value === 'like' ? true : false;
    setValueSelect(zero);
  };
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      maxHeight: '100px',
      autofocus: true,
      spellChecker: false,
    };
  }, []);

  return (
    <>
      {contextHolder}
      <Select
        className={styles.selec}
        defaultValue="like"
        onChange={handleChange}
        options={[
          { value: 'like', label: 'like' },
          { value: 'hate', label: 'hate' },
        ]}
      />
      <div className={styles.bc}>
        <SimpleMdeReact
          options={autofocusNoSpellcheckerOptions}
          value={valueZ}
          onChange={onChange}
        />
      </div>
      <Button className={styles.btn} onClick={() => handleCreate()}>
        Add comment
      </Button>
    </>
  );
};

export default Texteditor;
