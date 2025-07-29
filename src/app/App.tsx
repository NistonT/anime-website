import { Button } from "@/components/ui/Button";
import { animeReleaseService } from "@/services/animeReleaseService";
import { useQuery } from "@tanstack/react-query";
import { List, Play } from "lucide-react";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

export const App = () => {
  const { data } = useQuery({
    queryKey: ["get_anime_updates"],
    queryFn: () => animeReleaseService.getReleaseLatest(5),
    select: (data) => data.data,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div>
        <Swiper spaceBetween={0} slidesPerView={1}>
          {Array.isArray(data) ? (
            data.map((elem) => (
              <SwiperSlide key={elem.id}>
                <div className="relative flex">
                  <div className="relative w-screen h-screen overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_URL}${elem.poster.optimized.src}`}
                      alt="blurred background"
                      className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 z-0"
                      aria-hidden="true"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-neutral-950/80" />
                  </div>
                  <div className="absolute top-1/2  transform -translate-y-1/2 flex gap-10">
                    <div className="w-1/2 ">
                      <div className="px-6 flex flex-col gap-5">
                        <h1 className="text-4xl font-black text-white leading-tight font-netflix">{elem.name.main}</h1>
                        <p className="text-sm text-white font-netflix">{elem.description}</p>
                      </div>
                      <div className="relative px-6 pt-10 flex gap-2 justify-end">
                        <Button>
                          <Play className="w-4 h-4 mr-2" />
                          {elem.latest_episode.ordinal} эпизод
                        </Button>
                        <Button>
                          <List className="w-4 h-4 mr-2" />
                          Все серии
                        </Button>
                      </div>
                    </div>
                    <div className="w-1/2 relative">
                      <div className="absolute p-4 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2">
                        <img
                          src={`${import.meta.env.VITE_URL}${elem.poster.optimized.src}`}
                          alt="blurred background"
                          className="object-contain z-0 max-w-2xl rounded-2xl"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
