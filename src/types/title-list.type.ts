export interface ITitleListParams {
  id_list?: string;
  code_list?: string;
  torrent_id_list?: string;
  filter?: string;
  remove?: string;
  include?: string;
  description_type?: "html" | "plain" | "no_view_order";
  playlist_type?: "object" | "array";
  page?: number;
  items_per_page?: number;
}
