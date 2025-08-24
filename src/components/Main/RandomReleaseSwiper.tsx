import { countCardAppPage } from "@/constants/countCardsMainPage.constants";
import type { IReleaseRandom } from "@/types/release-random";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "../Card";

type Props = {
  releaseRandom: IReleaseRandom[] | undefined;
};

export const RandomReleaseSwiper = ({ releaseRandom }: Props) => {
  return (
    <div className="pt-50">
      <h1 className="font-netflix text-white text-lg font-medium py-4">Случайные релизы</h1>
      <Swiper spaceBetween={0} slidesPerView={countCardAppPage} className="flex">
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
  );
};
