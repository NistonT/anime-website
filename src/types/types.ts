export interface IOption {
  value: string;
  description: string;
}

export type IType = IOption;
export type IColor = IOption;
export type IQuality = IOption;
export type ISeason = IOption;
export type IPublishDay = IOption;
export type IMemberRole = IOption;

// -------------------------------

export interface ITheme {
  stop: number | null;
  start: number | null;
}

export type IOpening = ITheme;
export type IEnding = ITheme;

// -------------------------------

export interface IAgeRating extends IOption {
  label: string;
  is_adult: boolean;
}

// -------------------------------

export type TypeImage = {
  src: string;
  preview: string;
  thumbnail: string;
};

export interface IPoster extends TypeImage {
  optimized: TypePosterOptimized;
}

type TypePosterOptimized = Omit<IPoster, "optimized">;

export type IGenresImage = Omit<TypeImage, "src"> & { optimized: TypeGenresImageOptimized };

type TypeGenresImageOptimized = Omit<IGenresImage, "optimized">;

export interface IPreview extends TypeImage {
  optimized: TypePreviewOptimized;
}

type TypePreviewOptimized = Omit<IPreview, "optimized">;

export type IMemberUserAvatar = Omit<TypeImage, "src"> & { optimized: TypeMemberUserAvatarOptimized };

type TypeMemberUserAvatarOptimized = Omit<IMemberUserAvatar, "optimized">;

// -------------------------------

export interface IName {
  main: string;
  english: string;
  alternative: string | null;
}

export interface IGenres {
  id: number;
  name: string;
  image: IGenresImage;
  total_releases: number;
}

export interface IEpisode {
  id: string;
  name: string | null;
  ordinal: number;
  ending: IEnding;
  opening: IOpening;
  preview: IPreview;
  hls_480: string;
  hls_720: string;
  hls_1080: string;
  duration: number;
  rutube_id: string | null;
  youtube_id: string | null;
  updated_at: string;
  sort_order: number;
  release_id: number;
  name_english: string | null;
}

export interface IMembers {
  id: string;
  role: IMemberRole;
  user: IMemberUser;
  nickname: string;
}

export interface IMemberUser {
  id: number;
  avatar: IMemberUserAvatar;
}

export interface ICodec {
  value: string;
  label: string;
  description: string;
  label_color: string;
  label_is_visible: boolean;
}

export interface ITorrent {
  id: number;
  hash: string;
  size: number;
  type: IType;
  color: IColor;
  codec: ICodec;
  label: string;
  quality: IQuality;
  magnet: string;
  filename: string;
  seeders: number;
  bitrate: number;
  leechers: number;
  sort_order: number;
  updated_at: string;
  is_hardsub: boolean;
  description: string;
  created_at: string;
  completed_times: number;
}

export interface ISponsor {
  id: string;
  title: string;
  description: string;
  url_title: string;
  url: string;
}

export interface ILinks {
  previous: string;
  next: string;
}

export interface IMetaPagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: ILinks;
}
