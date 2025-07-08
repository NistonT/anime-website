import type { ITitle } from "@/types/title.type";
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore } from "@vidstack/react";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { useMemo, useRef, useState } from "react";

type Props = {
  video: ITitle;
};

export const VideoPlayer = ({ video }: Props) => {
  const [videoHost] = useState(video.player.host);
  const player = useRef<MediaPlayerInstance>(null);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const { fullscreen, qualities, canSetQuality } = useMediaStore(player);

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
        "#EXT-X-STREAM-INF:RESOLUTION=720x480",
        video.player.list?.[1]?.hls?.sd ? `https://${videoHost}${video.player.list[1].hls.sd}` : "",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=1280x720",
        video.player.list?.[1]?.hls?.hd ? `https://${videoHost}${video.player.list[1].hls.hd}` : "",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=1920x1080",
        video.player.list?.[1]?.hls?.fhd ? `https://${videoHost}${video.player.list[1].hls.fhd}` : "",
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
    <div className="w-full h-screen flex items-center justify-center p-4 bg-gray-900">
      <div
        className={`relative transition-all duration-300 ${
          fullscreen ? "fixed inset-0 z-50 flex items-center justify-center bg-black" : "w-[800px] h-[450px]"
        }`}
      >
        <MediaPlayer
          title="HLS Видео"
          src={{
            src: videoSrc,
            type: "application/x-mpegurl",
          }}
          style={{
            "--media-video-object-fit": "fill",
          }}
          ref={player}
          className={`
          w-full h-full rounded-lg overflow-hidden bg-black
          ${fullscreen ? `object-cover h-screen w-screen` : "object-contain"}
        `}
        >
          <MediaProvider />

          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="flex justify-center gap-4 bg-black bg-opacity-60 backdrop-blur-sm rounded py-2">
              <button onClick={toggleFullscreen} type="button" className="text-white px-3 py-1 rounded hover:bg-gray-700">
                {fullscreen ? "Выход из полноэкранного режима" : "Полный экран"}
              </button>

              <button onClick={toggleAutoPlay} type="button" className="text-white px-3 py-1 rounded hover:bg-gray-700">
                {isPlaying ? "Пауза" : "Старт"}
              </button>

              <div className="flex gap-2">
                {qualities.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      q.selected = true;
                    }}
                    disabled={!canSetQuality}
                    className={`px-3 py-1 rounded text-sm ${
                      q.selected ? "bg-green-500 text-white" : "bg-gray-200"
                    } ${!canSetQuality && "opacity-50 cursor-not-allowed"}`}
                  >
                    {q.height}p
                  </button>
                ))}
              </div>
            </div>
          </div>
        </MediaPlayer>
      </div>
    </div>
  );
};
