import type { IErrorReleaseLatest, IReleaseLatest } from "@/types/release-latest.type";
import type { SwiperInstance } from "@/types/swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AdditionalSwiper } from "./AdditionalSwiper";
import { ElemList } from "./ElemList";

type Props = {
  topSwiperRef: React.RefObject<SwiperInstance | null>;
  bottomSwiperRef: React.RefObject<SwiperInstance | null>;
  releaseLatest: IReleaseLatest[] | IErrorReleaseLatest | undefined;
  setActiveId: (value: number | null) => void;
  activeId: number | null;
};

export const MainScreenSwiper = ({ topSwiperRef, bottomSwiperRef, releaseLatest, setActiveId, activeId }: Props) => {
  return (
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

      <AdditionalSwiper bottomSwiperRef={bottomSwiperRef} topSwiperRef={topSwiperRef} releaseLatest={releaseLatest} activeId={activeId} />
    </div>
  );
};
