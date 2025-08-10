import { animeReleaseService } from "@/services/animeReleaseService";
import { useQuery } from "@tanstack/react-query";

export const useAnimeReleaseRandom = (limit: number = 10) => {
  const { data } = useQuery({
    queryKey: [`get_anime_random_${limit}`],
    queryFn: () => animeReleaseService.getReleaseRandom(limit),
    select: (data) => data.data,
  });

  return { data };
};
