import type { ITitle } from "./title.type";

export interface ITitleChangesParams {
  filter?: string;
  remove?: string;
  include?: string;
  limit?: number;
  since?: number;
  description_type?: string;
  playlist_type?: string;
  after: number;
  page: number;
  items_per_page: number;
}

export interface ITitleChange {
  list: ITitle[];
  pagination: {
    pages: number;
    current_page: number;
    items_per_page: number;
    total_items: number;
  };
}
