export type movieType = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};

export type FormInputs = {
  username: string;
  password: string;
}

export type MovieArray={
  Search: MovieApiOneType[],
  totalResult: string,
  Response: boolean,
  Error?: string,
}

export type MovieApiOneType = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
  value?: string;
}
export type Rating = {
  Source: string
  Value: string
}
export type argType = {
  id: string,
  title?: string,
  year?: string,
}


export type Root2 =  {
  body: Body[]
  id?: string
  imdbid?: string,
  like?: boolean,
}

export type Body = {
  postId: number
  name: string
  text: string
  like?: boolean,
  date?: any,
}


export type TrailerApi = {
  id: string
  tmdb_id: number
  imdb_id: string
  language: string
  title: string
  url: string
  trailer: Trailer
  videos: Video[],
  error?: string,
  status?: string,
}

export type Trailer = {
  id: string
  youtube_video_id: string
  youtube_channel_id: string
  youtube_thumbnail: string
  title: string
  thumbnail: string
  language: string
  categories: string[]
  published: string
  views: number
}

export type Video =  {
  id: string
  youtube_video_id: string
  youtube_channel_id: string
  youtube_thumbnail: string
  title: string
  thumbnail: string
  language: string
  categories: string[]
  published: string
  views: number
}

export type login ={
  username : string,
  password?: string,
  info?: string,
  avatar?:any,
  imdbID? :any,
  time?: any,
}
export type getInfoUser = {
  username : string,
  password: string,
  info: string,
  avatar?:any,
  roles?: any;
}

export type repassType = {
    oldPassword: string,
      newPassord: string,
      oldUsername: string,
      message?:any,
}
export type renameType = {
  newUsername: string,
  oldUsername: string,
}

export type tokenType = {
    token: string;

};

export type SearchProps = {
  placeholder: string,
  children?: any,
  onChange?: ()=>void,
}

export type CommentProps = {
  id: string
}

export type  MovieListProps = {
  movie: movieType[];
}

export type ratingType = {
  imdbid: string,
  rating: number,
}

export interface RootYts {
  status: string
  status_message: string
  data: DataYts
  "@meta": any,
}


export type  DataYts = {
  movie_count: number
  limit: number
  page_number: number
  movies: MovieYts[]
}



export type MovieYts = {
  id: number
  url: string
  imdb_code: string
  title: string
  title_english: string
  title_long: string
  slug: string
  year: number
  rating: number
  runtime: number
  genres: string[]
  summary: string
  description_full: string
  synopsis: string
  yt_trailer_code: string
  language: string
  mpa_rating: string
  background_image: string
  background_image_original: string
  small_cover_image: string
  medium_cover_image: string
  large_cover_image: string
  state: string
  torrents: Torrent[]
  date_uploaded: string
  date_uploaded_unix: number
}

export type Torrent = {
  url: string
  hash: string
  quality: string
  type: string
  is_repack: string
  video_codec: string
  bit_depth: string
  audio_channels: string
  seeds: number
  peers: number
  size: string
  size_bytes: number
  date_uploaded: string
  date_uploaded_unix: number
}

export type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export type DataType = {
  key: React.Key;
  rank: string;
  title: string;
  lifetime: string;
  year: string;
  imdb?: string;
};

export type ChatAllRequest={
  username: string;
  time: string
}

export type ChatAllResponse={
  _id: string
  sender: string
  text: string
  socketId: string
  room: string
  date: string
  time: string
  __v: number
}

export type EmailReadRequest={
  username: string;
  email: number
}


export type GetEmailRequest={
  username: string;
}

export type GetEmailResponse = number;

export type GetUsersResponse = {
  _id: string
  username: string
  password: string
  roles: string[]
  __v: number
  avatar: string
  info: string
  favorites: Favorite[]
  time?: string
  emailRead: number
  message: Message[]
}

export interface Favorite {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}



export interface Message {
  id: string
  myname: string
  username: string
  theme: string
  text: string
  time: string
  date: string
  read: boolean
}


export type SendMessageRequest={
  id: any,
  username: string,
  myname: string,
  theme: string,
  text: string,
  date: any,
  time: any,
  read: any,
}

export type UpdateMessageRequest = {
  id: any,
  username: string,
}


