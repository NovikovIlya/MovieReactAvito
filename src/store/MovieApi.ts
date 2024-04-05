import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {

  GetUsersResponse,
  MovieApiOneType,
  MovieArray,
  Root2,
  SendMessageRequest,
  TrailerApi,
  UpdateMessageRequest,
  argType,
  getInfoUser,
  login,
  movieAll,
  oneMovieType,
  ratingType,
  renameType,
  repassType,
  tokenType,
} from '../types';



export const MovieApi = createApi({
  reducerPath: 'apiMovies',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.kinopoisk.dev/v1.4/movie',
    prepareHeaders: (headers) => {
      // headers.set('X-API-KEY', '1EDBRR5-VBQ4W08-QBDF41V-KZSDBV8');
      headers.set('X-API-KEY', 'WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M');
      return headers;
    },
  }),
  tagTypes: ['Fetch'],
  endpoints: (builder) => ({
    fetchMovies: builder.query<movieAll, string>({
      query: (search) => ({
        url: `/search?query=${search}`,
      }),
    }),
    fetchMoviesOne: builder.query<oneMovieType, any>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
    fetchRandom: builder.query<oneMovieType, string>({
      query: (value) => ({
        url: `/${value}`,
      }),
    }),
  }),
});




export const fetchCommentApi = createApi({
  reducerPath: 'fetchComment',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://64b7de9021b9aa6eb079301d.mockapi.io/' }),
  tagTypes: ['fetchComment'],
  endpoints: (builder) => ({
    fetchComment: builder.query<Root2[], string>({
      query: (id) => ({
        url: `comment/?imdbid=${id}`,
      }),
    }),
    fetchRating: builder.query<ratingType[], string>({
      query: (id) => ({
        url: `items/?imdbid=${id}`,
      }),
    }),
    AddRating: builder.mutation<any, any>({
      query: (add) => ({
        method: 'POST',
        url: 'items',
        body: add,
      }),
      invalidatesTags: ['fetchComment'],
    }),
    AddComment: builder.mutation<Root2, Root2>({
      query: (add) => ({
        method: 'POST',
        url: 'comment',
        body: add,
      }),
      invalidatesTags: ['fetchComment'],
    }),
  }),
});



export const torrentApi = createApi({
  reducerPath: 'torrent',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.kinopoisk.dev/v1.4',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', 'WF76VQQ-HQB4P5G-JFJH8DF-CRKDP1M');
      return headers;
    },
   }),
  tagTypes: ['torrent'],
  endpoints: (builder) => ({
    torrentFetch: builder.query<any, string>({
      query: (id) => ({
        url: `movie/${id}`,
      }),
      providesTags:['torrent']
    }),
    
    // AVITO
    fetchMoviesPopular: builder.query<any, any>({
      query: (search) => ({
        url: `movie?${search}`,
      }),
    }),
  }),
});


export const info = createApi({
  reducerPath: 'Info',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backmovie.onrender.com/' }),
  tagTypes: ['getuser','info'],
  endpoints: (builder) => ({
    infoApiSet: builder.mutation<getInfoUser, login>({
      query: (add) => ({
        method: 'POST',
        url: 'auth/info',
        body: add,
      }),
      invalidatesTags: ['getuser'],
    }),
    getUserApiSet: builder.mutation<getInfoUser, login>({
      query: (add) => ({
        method: 'POST',
        url: 'auth/user',
        body: add,
      }),
      invalidatesTags: ['info']
    }),
    RegistrApiSet: builder.mutation<login, login>({
      query: (add) => ({
        method: 'POST',
        url: 'auth/registrationNew',
        body: add,
      }),
      invalidatesTags: ['info'],
    }),
    repassApiSet: builder.mutation<repassType, repassType>({
      query: (add) => ({
        method: 'PUT',
        url: 'auth/repassword',
        body: add,
      }),
      invalidatesTags: ['info'],
    }),
    renameApiSet: builder.mutation<any, renameType>({
      query: (add) => ({
        method: 'PUT',
        url: 'auth/rename',
        body: add,
      }),
      invalidatesTags: ['info'],
    }),
    LoginApiSet: builder.mutation<tokenType, login>({
      query: (add) => ({
        method: 'POST',
        url: 'auth/login',
        body: add,
      }),
      invalidatesTags: ['info']
    }),
    
    sendMessage: builder.mutation<SendMessageRequest[], SendMessageRequest>({
      query: (add) => ({
        method: 'POST',
        url: 'auth/sendmessage',
        body: add,
      }),
      invalidatesTags: ['info']
    }),
    
  }),
});

export const infoTag = createApi({
  reducerPath: 'infoTag',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backmovie.onrender.com/auth/' }),
  tagTypes: ['infoTag'],
  endpoints: (builder) => ({
    infoApiSetTwo: builder.query<any, any>({
      query: (add) => ({
        url: 'info'
      }),
      providesTags: ['infoTag'],
    }),
    getUserApiSetTwo: builder.mutation<any, any>({
      query: (add) => ({
        method: 'POST',
        url: 'user',
        body: add,
      }),
      invalidatesTags: ['infoTag']
    })
    
  }),
})



export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backmovie.onrender.com/auth/me',
    prepareHeaders: (headers, { getState }) => {
      headers.set('authorization', `Bearer ${window.localStorage.getItem('token')}`);
      return headers;
    },
  }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    authApi: builder.query<login, string>({
      query: () => ({
        url: '',
      }),
    }),
  }),
});

export const { useFetchMoviesQuery,useFetchMoviesOneQuery,useFetchRandomQuery } = MovieApi;
export const { useFetchCommentQuery,useFetchRatingQuery ,useAddRatingMutation,useAddCommentMutation} = fetchCommentApi;
export const { useAuthApiQuery, useLazyAuthApiQuery } = auth;

export const { useTorrentFetchQuery,useFetchMoviesPopularQuery } = torrentApi;

export const {
  useInfoApiSetMutation,
  useGetUserApiSetMutation,
  useRegistrApiSetMutation,
  useRepassApiSetMutation,
  useRenameApiSetMutation,
  useLoginApiSetMutation,
  useSendMessageMutation,
} = info;

export const { useInfoApiSetTwoQuery,useGetUserApiSetTwoMutation } = infoTag;

