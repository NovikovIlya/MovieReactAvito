export type MyData = {
  oldUsername: string;
  favorites?: any;
  imdbID?: any;
};

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
export type Ratings = {
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

export type Trailers = {
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


















export type oneMovieProps = {
  dataMain: oneMovieType
}
export type movieAll ={
  docs:oneMovieType[],
  error?:any,
}
////////////
export interface oneMovieType {
  error?:any,
  status: string
  externalId: ExternalId
  rating: Rating
  votes: Votes
  backdrop: Backdrop
  images: Images
  productionCompanies: ProductionCompany[]
  spokenLanguages: SpokenLanguage[]
  id: number
  type: string
  name: string
  description: string
  distributors: Distributors
  premiere: Premiere
  slogan: string
  year: number
  poster: Poster
  facts: Fact[]
  genres: Genre[]
  countries: Country[]
  seasonsInfo: SeasonsInfo[]
  persons: Person[]
  lists: string[]
  typeNumber: number
  alternativeName: string
  enName: string
  names: Name[]
  budget: Budget
  color: string
  movieLength: any
  networks: any
  shortDescription: string
  subType: string
  fees: Fees
  updatedAt: string
  ratingMpaa: any
  technology: Technology
  ticketsOnSale: boolean
  similarMovies: SimilarMovy[]
  sequelsAndPrequels: SequelsAndPrequel[]
  ageRating: number
  logo: Logo
  watchability: Watchability
  imagesInfo: ImagesInfo
  releaseYears: ReleaseYear[]
  top10: any
  top250: number
  deletedAt: any
  isSeries: boolean
  seriesLength: any
  totalSeriesLength: number
  videos: Videos
}

export interface ExternalId {
  imdb: string
  tmdb: number
  kpHD: string
}

export interface Rating {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: any
}

export interface Votes {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

export interface Backdrop {
  url: string
  previewUrl: string
}

export interface Images {
  postersCount: number
  backdropsCount: number
  framesCount: number
}

export interface ProductionCompany {
  name: string
  url: string
  previewUrl: string
}

export interface SpokenLanguage {
  name: string
  nameEn: string
}

export interface Distributors {
  distributor: any
  distributorRelease: string
}

export interface Premiere {
  world: string
  dvd: string
}

export interface Poster {
  url: string
  previewUrl: string
}

export interface Fact {
  value: string
  type: string
  spoiler: boolean
}

export interface Genre {
  name: string
}

export interface Country {
  name: string
}

export interface SeasonsInfo {
  number: number
  episodesCount: number
}

export interface Person {
  id: number
  photo: string
  name: string
  enName: string
  description?: string
  profession: string
  enProfession: string
}

export interface Name {
  name: string
  language?: string
  type: any
}

export interface Budget {}

export interface Fees {
  world: World
  russia: Russia
  usa: Usa
}

export interface World {}

export interface Russia {}

export interface Usa {}

export interface Technology {
  hasImax: boolean
  has3D: boolean
}

export interface SimilarMovy {
  id: number
  name: string
  enName: any
  alternativeName: string
  type: string
  poster: Poster2
}

export interface Poster2 {
  url: string
  previewUrl: string
}

export interface SequelsAndPrequel {
  id: number
  name: string
  alternativeName: string
  enName: any
  type: string
  poster: Poster3
  rating: Rating2
  year: number
}

export interface Poster3 {
  url: string
  previewUrl: string
}

export interface Rating2 {
  kp: number
  imdb: number
  filmCritics: number
  russianFilmCritics: number
  await: any
}

export interface Logo {
  url: string
}

export interface Watchability {
  items: any[]
}

export interface ImagesInfo {
  framesCount: number
}

export interface ReleaseYear {
  start: number
  end: number
}

export interface Videos {
  trailers: Trailer[]
}

export interface Trailer {
  url: string
  name: string
  site: string
  type: string
}
