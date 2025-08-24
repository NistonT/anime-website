import { countCardAppPage } from "@/constants/countCardsMainPage.constants";
import type { IErrorReleaseLatest, IReleaseLatest } from "@/types/release-latest.type";
import type { SwiperInstance } from "@/types/swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardReleaseLatest } from "../CardReleaseLatest";

type Props = {
  bottomSwiperRef: React.RefObject<SwiperInstance | null>;
  topSwiperRef: React.RefObject<SwiperInstance | null>;
  releaseLatest: IReleaseLatest[] | IErrorReleaseLatest | undefined;
  activeId: number | null;
};

export const AdditionalSwiper = ({ bottomSwiperRef, topSwiperRef, releaseLatest, activeId }: Props) => {
  return (
    <div className="absolute -bottom-50 w-full z-10">
      <Swiper
        spaceBetween={0}
        slidesPerView={countCardAppPage}
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
                <CardReleaseLatest
                  poster={elem.poster}
                  name={elem.name}
                  year={elem.year}
                  episodes_total={elem.episodes_total}
                  className={activeId === elem.id ? "opacity-100" : "opacity-0"}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>Ошибка: {releaseLatest?.parameter1 || "Неизвестная ошибка"}</p>
        )}
      </Swiper>
    </div>
  );
};
