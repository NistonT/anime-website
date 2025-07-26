import { useVideoPlayerLatest } from "@/hooks/useVideoPlayerLatest";
import { usePlayerStore } from "@/store/usePlayerStore";
import type { IEpisode } from "@/types/types";
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore } from "@vidstack/react";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { useEffect, useRef, useState } from "react";
import { ButtonSkips } from "./ButtonSkips";
import { EpisodeName } from "./EpisodeName";

type Props = {
  video: IEpisode;
  videoIndex: string;
  className?: string;
};

export const VideoPlayerLatest = ({ video, videoIndex, className }: Props) => {
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [isSettingPanel, setSettingPanel] = useState<boolean>(false);

  const { videoSrc } = useVideoPlayerLatest(video);

  const player = useRef<MediaPlayerInstance>(null);
  const { fullscreen, currentTime } = useMediaStore(player);

  const { activePlayerId, setActivePlayerId } = usePlayerStore();

  const togglePlaying = () => {
    if (isPlaying) {
      setPlaying(false);
      player.current?.pause();
    } else {
      setActivePlayerId(videoIndex);
      setPlaying(true);
      player.current?.play();
    }
  };

  useEffect(() => {
    console.log(video);
  }, [video]);

  useEffect(() => {
    if (isPlaying) {
      setActivePlayerId(videoIndex);
    }
  }, [isPlaying, videoIndex, setActivePlayerId]);

  useEffect(() => {
    if (activePlayerId && activePlayerId !== videoIndex && isPlaying) {
      player.current?.pause();
      setPlaying(false);
    }
  }, [activePlayerId, videoIndex, isPlaying]);

  useEffect(() => {
    return () => {
      if (activePlayerId === videoIndex) {
        setActivePlayerId(null);
      }
    };
  }, [activePlayerId, videoIndex, setActivePlayerId]);

  useEffect(() => {
    console.log(isPlaying);
  }, [isPlaying]);

  return (
    <div>
      <MediaPlayer
        title="HLS Видео"
        fullscreenOrientation="none"
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
        tabIndex={0}
        onClick={togglePlaying}
      >
        <MediaProvider />
        {!isPlaying && (
          <div
            className="absolute top-0 left-0 w-full h-full inset-shadow-md"
            onClick={() => {
              togglePlaying();
              setSettingPanel(false);
            }}
          >
            <div className="absolute bottom-24 px-2">
              <ButtonSkips currentTime={currentTime} player={player} fullscreen={fullscreen} opening={video.opening} ending={video.ending} />
            </div>
            <div className="absolute bottom-12 px-2">
              <EpisodeName fullscreen={fullscreen} name_rus={video.name} name_eng={video.name_english} />
            </div>
          </div>
        )}
      </MediaPlayer>
    </div>
  );
};
