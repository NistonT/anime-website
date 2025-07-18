import type { IAgeRating, IEpisode, IGenres, IMembers, IName, IPoster, IPublishDay, ISeason, ISponsor, ITorrent, IType } from "./types";

export interface IReleaseIdOrAlias {
  id: number;
  type: IType;
  year: number;
  name: IName;
  alias: string;
  season: ISeason;
  poster: IPoster;
  fresh_at: string;
  created_at: string;
  updated_at: string;
  is_ongoing: boolean;
  age_rating: IAgeRating;
  publish_day: IPublishDay;
  description: string;
  notification: string;
  episodes_total: number;
  external_player: string;
  is_in_production: boolean;
  is_blocked_by_geo: boolean;
  is_blocked_by_copyrights: boolean;
  added_in_users_favorites: number;
  average_duration_of_episode: number;
  added_in_planned_collection: number;
  added_in_watched_collection: number;
  added_in_watching_collection: number;
  added_in_postponed_collection: number;
  added_in_abandoned_collection: number;
  genres: IGenres[];
  members: IMembers[];
  episodes: IEpisode[];
  torrents: ITorrent[];
  sponsor: ISponsor;
}
