import type { Swiper } from "swiper/react";

export type SwiperInstance = Parameters<NonNullable<React.ComponentProps<typeof Swiper>["onSwiper"]>>[0];
