import { animeTitleService } from "@/services/animeTitleService";
import { useQuery } from "@tanstack/react-query";

export const About = () => {
  const { data } = useQuery({
    queryKey: ["get_anime_random"],
    queryFn: () => animeTitleService.getTitleRandom({}),
  });

  return (
    <>
      <div>
        <img src={`${import.meta.env.VITE_URL}${data?.posters.medium.url}`} alt="" />
      </div>
    </>
  );
};
