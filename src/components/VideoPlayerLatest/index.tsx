import { useVideoPlayerLatest } from "@/hooks/useVideoPlayerLatest";
import { useMediaPlayerLatest } from "@/store/useMediaPlayerLatest";
import { usePlayerStore } from "@/store/usePlayerStore";
import type { IEpisode } from "@/types/types";
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore } from "@vidstack/react";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { useEffect, useRef, useState } from "react";
import { ButtonFullscreen } from "./ButtonFullscreen";
import { ButtonPlaying } from "./ButtonPlaying";
import { ButtonSettingPlayer } from "./ButtonSettingPlayer";
import { ButtonSkips } from "./ButtonSkips";
import { EpisodeName } from "./EpisodeName";
import { SettingPlayer } from "./SettingPlayer";
import { VideoRewind } from "./VideoRewind";
import { VideoTime } from "./VideoTime";
import { VolumeInput } from "./VolumeInput";

type Props = {
  video: IEpisode;
  videoIndex: string;
  className?: string;
  width?: number;
  height?: number;
};

export const VideoPlayerLatest = ({ video, videoIndex, className, width, height }: Props) => {
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [isPlayingPanel, setPlayingPanel] = useState<boolean>(false);
  const { setSettingPlayer } = useMediaPlayerLatest();

  const { videoSrc } = useVideoPlayerLatest(video);

  const player = useRef<MediaPlayerInstance>(null);
  const { fullscreen, currentTime, duration, volume, muted, canSetQuality, qualities, quality } = useMediaStore(player);

  const { activePlayerId, setActivePlayerId } = usePlayerStore();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = () => {
    if (fullscreen && isPlaying) {
      setPlayingPanel(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setPlayingPanel(false);
      }, 3000);
    } else {
      setPlayingPanel(true);
    }
  };

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
    <div className="w-full h-full">
      <div
        className={`relative transition-all duration-300 ${
          fullscreen
            ? "fixed inset-0 z-50 flex items-center justify-center bg-black"
            : `w-[${width ? width : 800}px] h-[${height ? height : 450}px] ${className}`
        }`}
      >
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
          onMouseEnter={() => {
            if (!fullscreen) setPlayingPanel(true);
          }}
          onMouseLeave={() => {
            if (!fullscreen && isPlaying) setPlayingPanel(false);
          }}
          onMouseMove={() => {
            if (fullscreen && isPlaying) {
              handleMouseMove();
            } else if (fullscreen && !isPlaying) {
              setPlayingPanel(true);
            }
          }}
        >
          <MediaProvider />
          {isPlayingPanel && (
            <>
              <div
                className="absolute top-0 left-0 w-full h-full inset-shadow-md"
                onClick={() => {
                  togglePlaying();
                  setSettingPlayer(false);
                }}
              ></div>
              <div className="absolute bottom-24 px-2">
                <ButtonSkips currentTime={currentTime} player={player} fullscreen={fullscreen} opening={video.opening} ending={video.ending} />
              </div>
              <div className="absolute bottom-12 px-2">
                <EpisodeName fullscreen={fullscreen} name_rus={video.name} name_eng={video.name_english} />
              </div>
              <div className="absolute bottom-0 w-full pb-1">
                <div className="px-2">
                  <VideoRewind duration={duration} currentTime={currentTime} player={player} />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                      <ButtonPlaying togglePlaying={togglePlaying} isPlaying={isPlaying} />

                      <VolumeInput player={player} muted={muted} volume={volume} />

                      <VideoTime currentTime={currentTime} duration={duration} />
                    </div>
                    <div className="flex items-center gap-5">
                      <SettingPlayer fullscreen={fullscreen} quality={quality} qualities={qualities} canSetQuality={canSetQuality} />

                      <ButtonSettingPlayer />

                      <ButtonFullscreen fullscreen={fullscreen} player={player} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </MediaPlayer>
      </div>
    </div>
  );
};
