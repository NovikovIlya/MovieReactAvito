import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ChatAllRequest,
  ChatAllResponse,
  EmailReadRequest,
  GetEmailRequest,
  GetEmailResponse,
  GetUsersResponse,
  MovieApiOneType,
  MovieArray,
  Root2,
  RootYts,
  SendMessageRequest,
  TrailerApi,
  UpdateMessageRequest,
  argType,
  getInfoUser,
  login,
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
    fetchMovies: builder.query<any, string>({
      query: (search) => ({
        url: `/search?query=${search}`,
      }),
    }),
    fetchMoviesOne: builder.query<any, any>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});


export const trailerApi = createApi({
  reducerPath: 'trailerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.allorigins.win/raw?url=https://api.kinocheck.de/',
  }),
  tagTypes: ['trailerApi'],
  endpoints: (builder) => ({
    fetcTrailer: builder.query<TrailerApi, string>({
      query: (id) => ({
        url: `movies?imdb_id=${id}`,
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
  // AVITO
  endpoints: (builder) => ({
    torrentFetch: builder.query<any, string>({
      query: (id) => ({
        url: `movie/${id}`,
      }),
      providesTags:['torrent']
    }),
    similarFetch: builder.query<any, string>({
      query: (genre) => ({
        url: `list_movies.json?genre=${genre}&limit=10`,
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
    //1-ответ   2-аргумент(тело запроса)
    LoginApiSet: builder.mutation<tokenType, login>({
      query: (add) => ({
        method: 'POST',
        url: 'auth/login',
        body: add,
      }),
      invalidatesTags: ['info']
    }),
    // ChatAll: builder.mutation<ChatAllResponse[], ChatAllRequest>({
    //   query: (add) => ({
    //     method: 'POST',
    //     url: 'chatall',
    //     body: add,
    //   }),
    //   invalidatesTags: ['info']
    // }),
    // emailRead: builder.mutation<any, EmailReadRequest>({
    //   query: (add) => ({
    //     method: 'POST',
    //     url: 'auth/emailReading',
    //     body: add,
    //   }),
    //   invalidatesTags: ['info']
    // }),
    // getEmail: builder.mutation<GetEmailResponse, GetEmailRequest>({
    //   query: (add) => ({
    //     method: 'POST',
    //     url: 'auth/getemail',
    //     body: add,
    //   }),
    //   invalidatesTags: ['info']
    // }),
    // getUsers: builder.query<GetUsersResponse[], string>({
    //   query: () => ({
    //     url: 'auth/users',
    //   }),
    //   providesTags: ['info']
    // }),
    sendMessage: builder.mutation<SendMessageRequest[], SendMessageRequest>({
      query: (add) => ({
        method: 'POST',
        url: 'auth/sendmessage',
        body: add,
      }),
      invalidatesTags: ['info']
    }),
    // updateMessage: builder.mutation<SendMessageRequest[], UpdateMessageRequest>({
    //   query: (add) => ({
    //     method: 'PUT',
    //     url: 'auth/updatemessage',
    //     body: add,
    //   }),
    //   invalidatesTags: ['info']
    // }),
    // getMessage: builder.mutation<SendMessageRequest[], GetEmailRequest>({
    //   query: (add) => ({
    //     method: 'POST',
    //     url: 'auth/getmessage',
    //     body: add,
    //   }),
    //   invalidatesTags: ['info']
    // }),
    // deleteMessage: builder.mutation<SendMessageRequest[], UpdateMessageRequest>({
    //   query: (add) => ({
    //     method: 'DELETE',
    //     url: 'auth/deletemessage',
    //     body: add,
    //   }),
    //   invalidatesTags: ['info']
    // }),
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

export const { useFetchMoviesQuery,useFetchMoviesOneQuery } = MovieApi;
export const { useFetcTrailerQuery } = trailerApi;
export const { useFetchCommentQuery,useFetchRatingQuery ,useAddRatingMutation,useAddCommentMutation} = fetchCommentApi;
export const { useAuthApiQuery, useLazyAuthApiQuery } = auth;

export const { useTorrentFetchQuery,useSimilarFetchQuery,useFetchMoviesPopularQuery } = torrentApi;

export const {
  useInfoApiSetMutation,
  useGetUserApiSetMutation,
  useRegistrApiSetMutation,
  useRepassApiSetMutation,
  useRenameApiSetMutation,
  useLoginApiSetMutation,
  // useChatAllMutation,
  // useEmailReadMutation,
  // useGetEmailMutation,
  // useGetUsersQuery,
  useSendMessageMutation,
  // useUpdateMessageMutation,
  // useGetMessageMutation,
  // useDeleteMessageMutation
} = info;

export const { useInfoApiSetTwoQuery,useGetUserApiSetTwoMutation } = infoTag;

