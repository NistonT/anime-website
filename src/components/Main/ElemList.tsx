import type { IReleaseLatest } from "@/types/release-latest.type";
import { List, Play } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { VideoPlayerLatest } from "../VideoPlayerLatest";

type Props = {
  elem: IReleaseLatest;
  index: number;
};

export const ElemList = ({ elem, index }: Props) => {
  const [isOpenVideoLatest, setOpenVideoLatest] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    const imageUrl = `${import.meta.env.VITE_URL}${elem.poster.optimized.src}`;

    img.src = imageUrl;

    img.onload = () => {
      setImageSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [elem.poster.optimized.src]);
  useEffect(() => {
    console.log(isOpenVideoLatest);
  }, [isOpenVideoLatest]);

  return (
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
            <Button onClick={() => setOpenVideoLatest(true)}>
              <Play />
              {elem.latest_episode.ordinal} эпизод
            </Button>
            <Button>
              <List />
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
        <AnimatePresence>
          {isOpenVideoLatest && (
            <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2">
              <m.div
                initial={{
                  width: 0,
                  height: imageSize.height,
                  opacity: 0,
                  x: "50%",
                  y: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                animate={{ width: "100vw", height: "100vh", opacity: 1, x: "50%", y: "50%", translateX: "-50%", translateY: "-50%" }}
                exit={{
                  width: 0,
                  height: imageSize.height,
                  opacity: 0,
                  x: "50%",
                  y: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                transition={{ duration: 0.2 }}
                className={`relative overflow-hidden origin-center`}
              >
                <div className="rounded-2xl w-full h-full">
                  <VideoPlayerLatest
                    key={elem.latest_episode.id}
                    video={elem.latest_episode}
                    videoIndex={index.toString()}
                    className="rounded-2xl w-full h-full"
                    setOpenVideoLatest={setOpenVideoLatest}
                  />
                </div>
              </m.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
