import type { ITitle } from "@/types/title.type";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

type Props = {
  video: ITitle;
};

export const VideoPlayer = ({ video }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [videoHost] = useState(video.player.host);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !video.player.list[1]?.hls?.fhd) {
      console.error("Видео или источник не найден");
      return;
    }

    const url = `https://${videoHost}${video.player.list[1].hls.fhd}`;

    // Проверяем поддержку HLS через hls.js
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoElement);

      hlsRef.current = hls;
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari поддерживает HLS нативно
      videoElement.src = url;
      const onLoadedMetadata = () => {
        const playPromise = videoElement.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Safari: Воспроизведение началось");
            })
            .catch((error) => {
              console.error("Safari: Ошибка автовоспроизведения:", error);
            });
        }
      };

      videoElement.addEventListener("loadedmetadata", onLoadedMetadata);
    } else {
      console.error("Текущий браузер не поддерживает воспроизведение этого формата видео");
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (videoElement) {
        videoElement.pause();
        videoElement.src = "";
        videoElement.load();
      }
    };
  }, [videoHost]);

  return (
    <div className="video-player">
      <div>Видео код: {video.code}</div>
      <video
        ref={videoRef}
        controls
        muted
        playsInline
        className="w-full h-auto mt-4"
        poster="" // можно указать превью
      />
    </div>
  );
};
