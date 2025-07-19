import { useMediaPlayerAndIndex } from "@/store/useMediaPlayerAndIndex";
import type { IEpisode } from "@/types/types";
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore } from "@vidstack/react";
import { useEffect, useMemo, useRef } from "react";
import { ButtonPlaying } from "./ButtonPlaying";

type Props = {
  video: IEpisode;
  videoIndex: number;
};

export const VideoPlayer = ({ video, videoIndex }: Props) => {
  const mediaPlayer = useRef<MediaPlayerInstance>(null);
  const { fullscreen } = useMediaStore(mediaPlayer);

  const { setIndex, setMediaPlayer } = useMediaPlayerAndIndex();

  useEffect(() => {
    setIndex(videoIndex.toString());
    setMediaPlayer(mediaPlayer);
  }, [videoIndex, mediaPlayer, setIndex, setMediaPlayer]);

  const playlist = useMemo(
    () =>
      [
        "#EXTM3U",
        "#EXT-X-VERSION:4",
        "#EXT-X-PLAYLIST-TYPE:VOD",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=720x480",
        video.hls_480,
        "",
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

  return (
    <>
      <div>
        <MediaPlayer
          title={`player ${videoIndex}`}
          fullscreenOrientation="none"
          src={{
            src: videoSrc,
            type: "application/x-mpegurl",
          }}
          style={{
            "--media-video-object-fit": "fill",
          }}
          ref={mediaPlayer}
          className={`
          w-full h-full rounded-lg overflow-hidden bg-black
          ${fullscreen ? `object-cover h-screen w-screen` : "object-contain"}
        `}
          tabIndex={0}
        >
          <MediaProvider />
          <div>
            <ButtonPlaying />
          </div>
        </MediaPlayer>
      </div>
    </>
  );
};
