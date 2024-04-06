import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MyData } from '../types';



export const deleteFavorites = createAsyncThunk(
  'post/deleteFavorites',
  async (dataBody: MyData) => {
    const { data } = await axios.delete('https://backmovie.onrender.com/auth/deleteFavorites', {
      data: { oldUsername: dataBody.oldUsername, imdbID: dataBody.imdbID },
    });
    return data;
  },
);

export const getFavorites = createAsyncThunk('post/getFavorites', async (dataBody: MyData) => {
  const { data } = await axios.post('https://backmovie.onrender.com/auth/getfavorites', {
    oldUsername: dataBody.oldUsername,
  });
  return data;
});

export const addFavorites = createAsyncThunk('post/addFavorites', async (dataBody: MyData) => {
  const { data } = await axios.post('https://backmovie.onrender.com/auth/addfavorites', {
    oldUsername: dataBody.oldUsername,
    favoritesNew: dataBody.favorites,
  });
  return data;
});

const initialState = {
  films: [],
  value: '',
  empty: false,
  favorite: [],
  darkMode: false,
  render: false,
  avatar: 'https://innostudio.de/fileuploader/images/default-avatar.png',
  dropdown: 'alipay',
  textComment: 'Enter comment',
  favoritesNew: [],
  isLoad: false,
  closed: false,
  emailAll: 0,
  myName: '',
  num: 1
};

export const sliceMovie = createSlice({
  name: 'sliceMovie',
  initialState,
  reducers: {
    changePag: (state, action) => {
      state.num = action.payload;
    },
    setNumReduce: (state, action) => {
      state.num = action.payload;
    },
    addMovie: (state, action) => {
      state.films = action.payload;
    },
    addValue: (state, action) => {
      state.value = action.payload;
    },
    toogleEmpty: (state, action) => {
      state.empty = action.payload;
    },
    addFavorite: (state, action) => {
      if (state.favorite.find((item) => item.imdbID === action.payload.imdbID)) {
        alert('Фильм уже добавлен в избранное');
        return;
      }
      state.favorite = [...state.favorite, action.payload];
    },
    deleteFavorite: (state, action) => {
      state.favorite = state.favorite.filter((item) => item.imdbID !== action.payload.imdbID);
    },
    darkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleRender: (state) => {
      state.render = true;
    },
    switchAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    toggleDropdown: (state, action) => {
      state.dropdown = action.payload;
    },
    addTextComment: (state, action) => {
      state.textComment = action.payload;
    },
    deletefavoritesNew: (state, action) => {
      state.favoritesNew = state.favoritesNew.filter((item) => {
        return item.imdbID !== action.payload;
      });
    },
    setClosed: (state, action) => {
      state.closed = action.payload;
    },
    setEmailAll: (state, action) => {
      state.emailAll = action.payload;
    },
    setMyName: (state,action ) =>{
      state.myName = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFavorites.pending, (state) => {
      state.favoritesNew = [];
      state.isLoad = true;
    });
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      state.favoritesNew = action.payload;
      state.isLoad = false;
    });
    builder.addCase(getFavorites.rejected, (state) => {
      state.favoritesNew = [];
      state.isLoad = false;
    });
  },
});

export const {
  addMovie,
  addValue,
  toogleEmpty,
  addFavorite,
  deleteFavorite,
  darkMode,
  toggleRender,
  switchAvatar,
  toggleDropdown,
  addTextComment,
  deletefavoritesNew,
  setClosed,
  setEmailAll,
  setMyName,
  setNumReduce,
  changePag
} = sliceMovie.actions;
export default sliceMovie.reducer;
