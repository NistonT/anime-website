import { VideoPlayerLatest } from "@/components/VideoPlayerLatest";
import { animeReleaseService } from "@/services/animeReleaseService";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

export const App = () => {
  const { data } = useQuery({
    queryKey: ["get_anime_updates"],
    queryFn: () => animeReleaseService.getReleaseLatest(5),
    select: (data) => data.data,
  });

  return (
    <>
      <div>
        <Swiper spaceBetween={0} slidesPerView={1}>
          {Array.isArray(data) ? (
            data.map((elem, index) => (
              <SwiperSlide key={elem.id}>
                <div className="relative">
                  <div className="relative z-20">{/* <img src={`${import.meta.env.VITE_URL}${elem.preview}`} alt="poster" /> */}</div>
                  <div>{/* <VideoPlayer video={elem.latest_episode} videoIndex={index} /> */}</div>
                </div>
                <VideoPlayerLatest video={elem.latest_episode} videoIndex={index.toString()} />
              </SwiperSlide>
            ))
          ) : (
            <p>Ошибка: {data?.parameter1 || "Неизвестная ошибка"}</p>
          )}
        </Swiper>
      </div>
    </>
  );
};
