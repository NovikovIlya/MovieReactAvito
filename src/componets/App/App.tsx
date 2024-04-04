import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Main.css';
import { Route, Routes } from 'react-router-dom';
import MovieCharacteristics from '../MovieCharacterisics/MovieCharacteristics';
import MainPage from '../MainPage/MainPage';
import LoginPage from '../Login/LoginPage';
import Auth from '../Auth/Auth';
import { ConfigProvider,  theme } from 'antd';
import { useAppSelector } from '../../hooks/redux';
import Profile from '../Profile/Profile';
import Layout from '../Layout/Layout';
import { Favorites } from '../Favorites/Favorites';
import New from '../New/New';
import Info from '../Info/Info';
import Chat from '../Chat/Chat';
import Main from '../Chat/Main';
import Not from '../Not/Not';
import Tableuser from '../Tableusers/Tableuser';
import Mail from '../Mail/Mail';
import Onemail from '../Onemail/Onemail';


function App() {
  const darkMode = useAppSelector((state) => state.sliceMovie.darkMode);
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.compactAlgorithm,
        }}>
        <Routes>
        <Route>
            <Route path="/" element={<Layout />}>
              <Route path='popular' element={<MainPage />} />
              <Route path="/:id" element={<MovieCharacteristics />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route index element={<New />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/mainchat" element={<Main />} />
              <Route path="/info/:name" element={<Info />} />
              <Route path="/not" element={<Not />} />
              <Route path="/tableuser" element={<Tableuser />} />
              <Route path="/mail" element={<Mail />} />
              <Route path="/onemail/:id/:name" element={<Onemail />} />
              <Route path="*" element={<>Нет такого</>} />
            </Route>
            </Route>
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
