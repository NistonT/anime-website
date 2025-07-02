import { animeTitleService } from "@/services/animeTitleService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import animePoster from "/image/animePoster.jpg";

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
    console.log(`${import.meta.env.VITE_URL}storage/releases/posters/9000/NBPPaSwgJrcoO4eg__f003bb6841ce26560a643491c197878f.jpg`);
  }, []);

  return (
    <>
      <div>
        <Swiper spaceBetween={0} slidesPerView={1}>
          {data?.list && data.list.length > 0 ? (
            data.list.map((elem) => (
              <SwiperSlide key={elem.id}>
                <div>
                  <img src={`${import.meta.env.VITE_URL}${elem.posters.medium.url}`} alt="poster" />
                  <div>
                    <p></p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img src={animePoster} alt="default poster" />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </>
  );
};
