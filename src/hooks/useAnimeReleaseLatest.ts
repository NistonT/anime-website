import { animeReleaseService } from "@/services/animeReleaseService";
import { useQuery } from "@tanstack/react-query";

export const useAnimeReleaseLatest = (limit: number = 10) => {
  const { data } = useQuery({
    queryKey: [`get_anime_updates_${limit}`],
    queryFn: () => animeReleaseService.getReleaseLatest(limit),
    select: (data) => data.data,
  });

  return { data };
};
