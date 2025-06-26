import type { IBlocked, IFranchises, INames, IPlayer, IPosters, ISeason, IStatus, ITeam, ITorrents, IType } from "./types";

export type EnumTypeTitle = "code" | "id";

export interface IGetTitleParams {
  id?: number;
  code?: string;
  torrent_id?: number;
  filter?: string;
  remove?: string;
  include?: string;
  description_type?: "html" | "plain" | "no_view_order";
  playlist_type?: "object" | "array";
}

export interface ITitle {
  id: number;
  code: string;
  names: INames;
  announce: string;
  in_favorites: string;
  posters: IPosters;
  updated: number;
  last_change: number;
  status: IStatus;
  type: IType;
  genres: string[];
  team: ITeam;
  season: ISeason;
  year: number;
  week_day: number;
  description: string;
  description_type: string;
  franchises: IFranchises[];
  blocked: IBlocked;
  player: IPlayer;
  torrents: ITorrents;
}
