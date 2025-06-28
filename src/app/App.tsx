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
        filter: "id,names,description,posters,status",
        limit: 5,
      }),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  }, []);

  return (
    <>
      <div>
        <Swiper spaceBetween={0} slidesPerView={3} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
          {data?.list.map((elem) => (
            <SwiperSlide key={elem.id}>
              <img src={`${import.meta.env.VITE_URL}${elem.posters.medium.url}`} alt="small" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
