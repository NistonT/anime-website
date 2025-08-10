import { Card } from "@/components/Card";
import { ElemList } from "@/components/Main/ElemList";
import { useAnimeReleaseLatest } from "@/hooks/useAnimeReleaseLatest";
import type { SwiperInstance } from "@/types/swiper";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAnimeReleaseRandom } from "../hooks/useAnimeReleaseRandom";

export const App = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState<number | null>(null);

  const bottomSwiperRef = useRef<SwiperInstance | null>(null);
  const topSwiperRef = useRef<SwiperInstance | null>(null);

  const { data: releaseLatest } = useAnimeReleaseLatest();
  const { data: releaseRandom } = useAnimeReleaseRandom(20);

  useEffect(() => {
    if (Array.isArray(releaseLatest) && releaseLatest.length > 0) {
      setActiveId(releaseLatest[0].id);
    }
  }, [releaseLatest]);

  return (
    <>
      <div>
        <div className="relative">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            onSwiper={(swiper) => {
              topSwiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              const currentIndex = swiper.activeIndex;
              if (Array.isArray(releaseLatest)) {
                const elem = releaseLatest[currentIndex];
                if (elem) {
                  setActiveId(elem.id);

                  bottomSwiperRef.current?.slideTo(currentIndex);
                }
              }
            }}
          >
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
          <div className="absolute -bottom-50 w-full">
            <Swiper
              spaceBetween={0}
              slidesPerView={6}
              onSwiper={(swiper) => {
                bottomSwiperRef.current = swiper;
              }}
            >
              {Array.isArray(releaseLatest) ? (
                releaseLatest.map((elem, index) => (
                  <SwiperSlide key={elem.id}>
                    <div
                      onClick={() => {
                        topSwiperRef.current?.slideTo(index);
                      }}
                    >
                      <Card
                        poster={elem.poster}
                        name={elem.name}
                        year={elem.year}
                        episodes_total={elem.episodes_total}
                        className={activeId === elem.id ? "" : ""}
                      />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <p>Ошибка: {releaseLatest?.parameter1 || "Неизвестная ошибка"}</p>
              )}
            </Swiper>
          </div>
        </div>

        <div className="pt-50">
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
