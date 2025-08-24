import { MainScreenSwiper } from "@/components/Main/MainScreenSwiper";
import { RandomReleaseSwiper } from "@/components/Main/RandomReleaseSwiper";
import { useAnimeReleaseLatest } from "@/hooks/useAnimeReleaseLatest";
import type { SwiperInstance } from "@/types/swiper";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { useAnimeReleaseRandom } from "../hooks/useAnimeReleaseRandom";

export const App = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

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
    <div>
      {/* Главный экран */}
      <MainScreenSwiper
        topSwiperRef={topSwiperRef}
        bottomSwiperRef={bottomSwiperRef}
        releaseLatest={releaseLatest}
        setActiveId={setActiveId}
        activeId={activeId}
      />

      {/* Случайные релизы */}
      <RandomReleaseSwiper releaseRandom={releaseRandom} />
    </div>
  );
};
