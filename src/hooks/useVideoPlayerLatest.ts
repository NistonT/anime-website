import type { IEpisode } from "@/types/types";
import { useMemo } from "react";

export const useVideoPlayerLatest = (video: IEpisode) => {
  const playlist = useMemo(
    () =>
      [
        "#EXTM3U",
        "#EXT-X-VERSION:4",
        "#EXT-X-PLAYLIST-TYPE:VOD",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=720x480",
        video.hls_480,
        "#EXT-X-STREAM-INF:RESOLUTION=1280x720",
        video.hls_720,
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=1920x1080",
        video.hls_1080,
      ].join("\n"),
    [video],
  );

  const videoSrc = useMemo(() => {
    const blob = new Blob([playlist], {
      type: "application/x-mpegurl",
    });
    return URL.createObjectURL(blob);
  }, [playlist]);

  return { videoSrc };
};
