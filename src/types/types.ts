export interface IType {
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
