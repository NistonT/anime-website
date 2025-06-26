import type { ITitle } from "./title.type";

export interface ITitleScheduleParams {
  filter?: string;
  remove?: string;
  include?: string;
  days?: string;
  description_type?: string;
  playlist_type?: string;
}

export interface ITitleSchedule {
  day: number;
  list: ITitle[];
}
