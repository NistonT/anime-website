import type { IAgeRating, IEpisode, IGenres, IName, IPoster, IPublishDay, ISeason, IType } from "./types";

export interface IReleaseLatest {
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
  notification: null;
  episodes_total: number | null;
  external_player: string | null;
  is_in_production: boolean;
  is_blocked_by_geo: boolean;
  is_blocked_by_copyrights: boolean;
  added_in_users_favorites: number;
  average_duration_of_episode: number | null;
  added_in_planned_collection: number;
  added_in_watched_collection: number;
  added_in_watching_collection: number;
  added_in_postponed_collection: number;
  added_in_abandoned_collection: number;
  genres: IGenres[];
  latest_episode: IEpisode;
}

export interface IErrorReleaseLatest {
  parameter1: string[];
  parameter2: string[];
}
