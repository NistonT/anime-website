import type { IEpisode } from "@/types/types";
import { useEffect, useMemo, useRef } from "react";

export const useVideoPlayerLatest = (video: IEpisode) => {
  const playlist = useMemo(() => {
    if (!video?.hls_480) return null;

    return [
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
    ].join("\n");
  }, [video]);

  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!playlist) {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
      return;
    }

    const blob = new Blob([playlist], { type: "application/x-mpegurl" });
    const url = URL.createObjectURL(blob);

    const oldUrl = blobUrlRef.current;
    blobUrlRef.current = url;

    return () => {
      if (oldUrl) {
        URL.revokeObjectURL(oldUrl);
      }
    };
  }, [playlist]);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  return { videoSrc: blobUrlRef.current };
};
