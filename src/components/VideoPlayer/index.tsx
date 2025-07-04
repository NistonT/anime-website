import type { ITitle } from "@/types/title.type";
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore } from "@vidstack/react";
import { useMemo, useRef, useState } from "react";

type Props = {
  video: ITitle;
};

export const VideoPlayer = ({ video }: Props) => {
  const [videoHost] = useState(video.player.host);
  const player = useRef<MediaPlayerInstance>(null);

  const [isPlaying, setPlaying] = useState<boolean>(false);
  const { fullscreen } = useMediaStore(player);

  const toggleFullscreen = () => {
    if (fullscreen) {
      player.current?.exitFullscreen();
    } else {
      player.current?.enterFullscreen();
    }
  };

  const toggleAutoPlay = () => {
    if (isPlaying) {
      player.current?.pause();
      setPlaying(false);
    } else {
      player.current?.play();
      setPlaying(true);
    }
  };

  const playlist = useMemo(
    () =>
      [
        "#EXTM3U",
        "#EXT-X-VERSION:4",
        "#EXT-X-PLAYLIST-TYPE:VOD",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=720х480",
        video.player.list?.[1]?.hls?.sd ? `https://${videoHost}${video.player.list[1].hls.sd}` : "",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=1280x720",
        video.player.list?.[1]?.hls?.hd ? `https://${videoHost}${video.player.list[1].hls.hd}` : "",
      ].join("\n"),
    [videoHost, video.player.list],
  );

  const videoSrc = useMemo(() => {
    const blob = new Blob([playlist], {
      type: "application/x-mpegurl",
    });
    return URL.createObjectURL(blob);
  }, [playlist]);

  if (!video.player) {
    return <div>Видео недоступно</div>;
  }

  return (
    <div className="video-player">
      <div>Видео код: {video.code}</div>

      <MediaPlayer
        title="HLS Видео"
        src={{
          src: videoSrc,
          type: "application/x-mpegurl",
        }}
        ref={player}
      >
        <MediaProvider />
        <div className="flex justify-center">
          <button onClick={toggleFullscreen} type="button">
            Полный экран
          </button>
          <div>
            <button onClick={toggleAutoPlay} type="button">
              {isPlaying ? "Поставить на паузу" : "Старт"}
            </button>
          </div>
        </div>
      </MediaPlayer>
    </div>
  );
};
