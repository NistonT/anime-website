import { VideoPlayer } from "@/components/VideoPlayer";
import { animeTitleService } from "@/services/animeTitleService";
import { useQuery } from "@tanstack/react-query";
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

  return (
    <>
      <div>
        <Swiper spaceBetween={0} slidesPerView={1}>
          {data?.list.map((elem, index) => {
            return (
              <>
                <SwiperSlide key={elem.id}>
                  <div className="relative">
                    <div className="relative z-20">
                      <img src={`${import.meta.env.VITE_URL}${elem.posters.medium.url}`} alt="poster" />
                    </div>
                    <div className="absolute z-10 top-0 right-0 w-full h-full">
                      <VideoPlayer video={elem} index={index} className="w-full h-full" />
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
