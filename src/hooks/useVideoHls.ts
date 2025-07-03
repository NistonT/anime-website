import type { ITitle } from "@/types/title.type";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

export const useVideoHls = (video: ITitle) => {
  const [videoHost] = useState(video.player.host);

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const initHls = (videoElement: HTMLVideoElement, url: string) => {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(videoElement);
    hlsRef.current = hls;
  };

  const initNativeHls = (videoElement: HTMLVideoElement, url: string) => {
    videoElement.src = url;
    const onLoadedMetadata = () => {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => console.log("Safari: Воспроизведение началось")).catch((e) => console.error("Safari: Ошибка автовоспроизведения", e));
      }
    };
    videoElement.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !video.player.list[1]?.hls?.fhd) return;

    const url = `https://${videoHost}${video.player.list[1].hls.fhd}`;

    if (Hls.isSupported()) {
      initHls(videoElement, url);
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      initNativeHls(videoElement, url);
    } else {
      console.error("Браузер не поддерживает воспроизведение HLS");
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

  return { videoRef };
};
