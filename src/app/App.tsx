import { Card } from "@/components/Card";
import { ElemList } from "@/components/Main/ElemList";
import { useAnimeReleaseLatest } from "@/hooks/useAnimeReleaseLatest";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAnimeReleaseRandom } from "../hooks/useAnimeReleaseRandom";

export const App = () => {
  const { data: releaseLatest } = useAnimeReleaseLatest();
  const { data: releaseRandom } = useAnimeReleaseRandom(20);
  return (
    <>
      <div>
        <Swiper spaceBetween={0} slidesPerView={1}>
          {Array.isArray(releaseLatest) ? (
            releaseLatest.map((elem, index) => (
              <SwiperSlide key={elem.id}>
                <ElemList elem={elem} index={index} />
              </SwiperSlide>
            ))
          ) : (
            <p>Ошибка: {releaseLatest?.parameter1 || "Неизвестная ошибка"}</p>
          )}
        </Swiper>
        <div>
          <h1 className="font-netflix text-white text-lg font-medium py-4">Случайные релизы</h1>
          <Swiper spaceBetween={0} slidesPerView={6} className="flex">
            {Array.isArray(releaseRandom) ? (
              releaseRandom.map((elem) => (
                <SwiperSlide key={elem.id}>
                  <Card poster={elem.poster} name={elem.name} year={elem.year} episodes_total={elem.episodes_total} />
                </SwiperSlide>
              ))
            ) : (
              <p>Ошибка: Неизвестная ошибка</p>
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
};
