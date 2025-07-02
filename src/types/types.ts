export interface INames {
  ru: string;
  en: string;
  alternative: string;
}

export interface IPosters {
  small: {
    url: string;
    raw_base64_file: string | null;
  };
  medium: {
    url: string;
    raw_base64_file: string | null;
  };
  original: {
    url: string;
    raw_base64_file: string | null;
  };
}

export interface IEpisodes {
  string: string;
  first: number;
  last: number;
}

export interface IStatus {
  string: string;
  code: 1 | 2 | 3 | 4;
}

export interface IType {
  full_string: string;
  string: string;
  episodes: number;
  length: string;
  code: 0 | 1 | 2 | 3 | 4;
}

export interface ITeam {
  voice: string[];
  translator: string[];
  editing: string[];
  decor: string[];
  timing: string[];
}

export interface ISeason {
  year: number;
  week_day: number;
  string: string;
  code: 1 | 2 | 3 | 4;
}

export interface IFranchises {
  franchise: IFranchise | null;
  releases: IReleases[] | null;
}

export interface IFranchise {
  id: string | null;
  name: string | null;
}

export interface IReleases {
  id: number | null;
  code: string | null;
  ordinal: number | null;
  names: INames | null;
}

export interface IBlocked {
  blocked: boolean | null;
  bakanim: boolean | null | null;
}

export interface IPlayer {
  alternative_player: string | null;
  host: IHost | null;
  list: IListPlayer[];
  rutube: IRutube | null;
  episodes: IEpisodes | null;
}

export interface IHost {
  hls: string | null;
}

export interface IListPlayer {
  episode: number | null;
  name: string | null;
  uuid: string | null;
  created_timestamp: number | null;
  preview: string | null;
  skips: number[] | null;
  hls: IHls | null;
}

export interface IRutube {
  episode: number | null;
  created_timestamp: number | null;
  rutube_id: string | null;
}

export interface IHls {
  fhd: string | null;
  hd: string | null;
  sd: string | null;
}

export interface ITorrents {
  episodes: IEpisodes | null;
  list: IListTorrents | null;
}

export interface IListTorrents {
  torrent_id: number | null;
  episodes: IEpisodes | null;
  quality: IQuality | null;
  leechers: number | null;
  seeders: number | null;
  downloads: number | null;
  total_size: number | null;
  size_string: string | null;
  url: string | null;
  magnet: string | null;
  uploaded_timestamp: number | null;
  raw_base64_fil: string | null;
  metadata: IMetadata | null;
  hash: string | null;
}

export interface IQuality {
  string: string | null;
  type: string | null;
  resolution: number | null;
  encoder: string | null;
  lq_audio: boolean | null;
}

export interface IMetadata {
  hash: string | null;
  name: string | null;
  announce: string[] | null;
  created_timestamp: number | null;
  files_list: IFilesList | null;
}

export interface IFilesList {
  file: string | null;
  size: number | null;
  size_string: string | null;
  offset: number | null;
}
