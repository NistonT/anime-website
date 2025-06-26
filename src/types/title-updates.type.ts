import type { ITitle } from "./title.type";

export interface ITitleUpdatesParams {
  filter?: string;
  remove?: string;
  include?: string;
  limit?: number;
  since?: number;
  description_type?: "html" | "plain" | "no_view_order";
  playlist_type?: "object" | "array";
  after?: number;
  page?: number;
  items_per_page?: number;
}

export interface ITitleUpdates {
  list: ITitle[];
  pagination: {
    pages: number;
    current_page: number;
    items_per_page: number;
    total_items: number;
  };
}
