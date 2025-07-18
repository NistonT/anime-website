export interface IType {
  value: string;
  description: string;
}

export interface IColor {
  value: string;
  description: string;
}

export interface IQuality {
  value: string;
  description: string;
}

export interface IName {
  main: string;
  english: string;
  alternative: string | null;
}

export interface ISeason {
  value: string;
  description: string;
}

export interface IPoster {
  src: string;
  preview: string;
  thumbnail: string;
  optimized: IPosterOptimized;
}

export interface IPosterOptimized {
  src: string;
  preview: string;
  thumbnail: string;
}

export interface IAgeRating {
  value: string;
  label: string;
  is_adult: boolean;
  description: string;
}

export interface IPublishDay {
  value: number;
  description: string;
}

export interface IGenres {
  id: number;
  name: string;
  image: IGenresImage;
  total_releases: number;
}

export interface IGenresImage {
  preview: string;
  thumbnail: string;
  optimized: IGenresImageOptimized;
}

export interface IGenresImageOptimized {
  preview: string;
  thumbnail: string;
}

export interface IOpening {
  stop: number | null;
  start: number | null;
}

export interface IEnding {
  stop: number | null;
  start: number | null;
}

export interface IPreview {
  src: string;
  preview: string;
  thumbnail: string;
  optimized: IPreviewOptimized;
}

export interface IPreviewOptimized {
  src: string;
  preview: string;
  thumbnail: string;
}

export interface ILatestEpisode {
  id: string;
  name: string | null;
  ordinal: string;
  opening: IOpening;
  ending: IEnding;
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

export interface IMemberRole {
  value: string;
  description: string;
}

export interface IMemberUser {
  id: number;
  avatar: IMemberUserAvatar;
}

export interface IMemberUserAvatar {
  preview: string;
  thumbnail: string;
  optimized: IMemberUserAvatarOptimized;
}

export interface IMemberUserAvatarOptimized {
  preview: string;
  thumbnail: string;
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
  duration: string;
  rutube_id: string;
  youtube_id: string;
  updated_at: string;
  sort_order: number;
  release_id: number;
  name_english: string | null;
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
