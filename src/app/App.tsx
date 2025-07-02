import { VideoPlayer } from "@/components/VideoPlayer";
import { animeTitleService } from "@/services/animeTitleService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

export const App = () => {
  const { data } = useQuery({
    queryKey: ["get_anime_updates"],
    queryFn: () =>
      animeTitleService.getTitleUpdates({
        filter: "id,names,genres,description,posters,status,player",
        limit: 5,
      }),
  });

  useEffect(() => {
    console.log(`${import.meta.env.VITE_URL}storage/releases/posters/9000/NBPPaSwgJrcoO4eg__f003bb6841ce26560a643491c197878f.jpg`);
    console.log(data);
  }, [data]);

  return (
    <>
      <div>
        <Swiper spaceBetween={0} slidesPerView={1}>
          {data?.list.map((elem) => {
            return (
              <>
                <SwiperSlide key={elem.id}>
                  <div>
                    <div>
                      <img src={`${import.meta.env.VITE_URL}${elem.posters.medium.url}`} alt="poster" />
                    </div>
                    <div>
                      <VideoPlayer video={elem} />
                    </div>
                    <div>
                      <p></p>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};
