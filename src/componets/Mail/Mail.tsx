import styles from './Mail.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import {
  useDeleteMessageMutation,
  useGetMessageMutation,
} from '../../store/MovieApi';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { DataType } from '../../types';



type DataIndex = keyof DataType;

const Mail = () => {
  const myName = useAppSelector((state) => state.sliceMovie.myName);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [getMessage, { data: dataMessage }] = useGetMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [users, setUsers] = useState([]);
  const data: any = users;
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns: ColumnsType<any> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '20%',
      
      // render: (text) => <a href='/'>{text}</a>,
      //@ts-ignore
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Theme',
      dataIndex: 'theme',
      key: 'theme',
      width: '20%',
      //@ts-ignore
      ...getColumnSearchProps('theme'),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '10%',
      //@ts-ignore
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      width: '10%',
      //@ts-ignore
      ...getColumnSearchProps('time'),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      width: '10%',
      //@ts-ignore
      // ...getColumnSearchProps('delete'),
    },
    {
      title: 'Read',
      dataIndex: 'read',
      key: 'read',
      width: '10%',
      //@ts-ignore
      ...getColumnSearchProps('read'),
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: '10%',
    },
  ];

  //hooks
  useEffect(() => {
    if (dataMessage) {
      const dataArray = dataMessage.map((item) => {
        return {
          key: item.id,
          username: item.myname,
          theme: item.theme,
          date: item.date,
          time: item.time,
          delete: (
            <Button onClick={deleteMessageFn} name={item.id}>
              Delete
            </Button>
          ),
          read: item.read ? 'yes' : 'no',
          link: <Link to={`/onemail/${item.id}/${item.myname}`}>Go</Link>,
        };
      });
      const uniqueArray = [];
      dataArray.forEach((element) => {
        if (!uniqueArray.some((e) => e.theme === element.theme)) {
          uniqueArray.push(element);
        }
      });
      setUsers(uniqueArray.reverse());
    }
  }, [dataMessage]);

  useEffect(() => {
    getMessage({ username: myName });
  }, []);

  //functions
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };
  const deleteMessageFn = (event) => {
    deleteMessage({
      username: myName,
      id: event.target.name,
    });
    getMessage({ username: myName });
  };

  return (
    <div>
      <div className={styles.tabl}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Mail;
