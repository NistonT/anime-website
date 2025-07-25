import { useAutoPlayMediaPlayer } from "@/store/useAutoPlayMediaPlayer";
import { usePlayerMediaPanel } from "@/store/usePlayerMediaPanel";
import { usePlayerStore } from "@/store/usePlayerStore";
import type { IEpisode } from "@/types/types";
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore } from "@vidstack/react";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { useEffect, useMemo, useRef } from "react";
import { ButtonEpisode } from "./ButtonEpisode";
import { ButtonFullscreen } from "./ButtonFullscreen";
import { ButtonPlaying } from "./ButtonPlaying";
import { ButtonSettingPlayer } from "./ButtonSettingPlayer";
import { EpisodeList } from "./EpisodeList";
import { EpisodeName } from "./EpisodeName";
import { SettingPlayer } from "./SettingPlayer";
import { VideoRewind } from "./VideoRewind";
import { VideoTime } from "./VideoTime";
import { VolumeInput } from "./VolumeInput";

type Props = {
  video: IEpisode | IEpisode[];
  videoIndex: number;
  width?: number;
  height?: number;
  className?: string;
};

export const VideoPlayer = ({ video, videoIndex, width, height, className }: Props) => {
  const mediaPlayer = useRef<MediaPlayerInstance>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { fullscreen, qualities, canSetQuality, currentTime, duration, volume, muted, quality } = useMediaStore(mediaPlayer);
  const { isPlaying, setPlaying } = useAutoPlayMediaPlayer();
  const {
    enterPlayerPanel,
    leavePlayerPanel,
    setListEpisode,
    listEpisode,
    selectedEpisode,
    setSelectedEpisode,
    currentEpisode,
    isPlayerPanel,
    closeSettingPanel,
    isOpenListEpisode,
  } = usePlayerMediaPanel();
  const { setActivePlayerId, activePlayerId } = usePlayerStore();

  const playlist = useMemo(
    () =>
      [
        "#EXTM3U",
        "#EXT-X-VERSION:4",
        "#EXT-X-PLAYLIST-TYPE:VOD",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=720x480",
        currentEpisode ? currentEpisode.hls_480 : Array.isArray(video) ? video[0].hls_480 : video.hls_480,
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=1280x720",
        currentEpisode ? currentEpisode.hls_720 : Array.isArray(video) ? video[0].hls_720 : video.hls_720,
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=1920x1080",
        currentEpisode ? currentEpisode.hls_1080 : Array.isArray(video) ? video[0].hls_1080 : video.hls_1080,
      ].join("\n"),
    [video, currentEpisode],
  );

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const toggleAutoPlay = () => {
    if (isPlaying) {
      mediaPlayer?.current?.pause();
      setPlaying(false);
    } else {
      setActivePlayerId(videoIndex.toString());
      mediaPlayer?.current?.play();
      setPlaying(true);
    }
  };

  const videoSrc = useMemo(() => {
    const blob = new Blob([playlist], {
      type: "application/x-mpegurl",
    });
    return URL.createObjectURL(blob);
  }, [playlist]);

  const handleMouseMove = () => {
    if (fullscreen && isPlaying) {
      enterPlayerPanel();

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        leavePlayerPanel();
      }, 3000);
    } else {
      enterPlayerPanel();
    }
  };

  useEffect(() => {
    if (Array.isArray(video)) {
      setListEpisode(video);
    }
  }, [video, listEpisode, setListEpisode]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [fullscreen, isPlaying]);

  useEffect(() => {
    if (selectedEpisode === "") {
      setSelectedEpisode("Эпизод 1");
    }
  }, [selectedEpisode, setSelectedEpisode]);

  // useEffect(() => {
  //   if (!listEpisode || !selectedEpisode) return;

  //   const episode = listEpisode ? Object.values(listEpisode).find((episode) => `Эпизод ${episode.episode}` === selectedEpisode) : null;

  //   if (episode) {
  //     setPropertiesEpisode(episode);
  //   }
  // }, [selectedEpisode, listEpisode]);

  useEffect(() => {
    if (isPlaying) {
      setActivePlayerId(videoIndex.toString());
    }
  }, [isPlaying, videoIndex, setActivePlayerId]);

  useEffect(() => {
    if (activePlayerId && activePlayerId !== videoIndex.toString() && isPlaying) {
      mediaPlayer.current?.pause();
      setPlaying(false);
    }
  }, [activePlayerId, videoIndex, isPlaying, setPlaying]);

  useEffect(() => {
    return () => {
      if (activePlayerId === videoIndex.toString()) {
        setActivePlayerId(null);
      }
    };
  }, [activePlayerId, videoIndex, setActivePlayerId]);

  return (
    <>
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
            ref={mediaPlayer}
            className={`
                w-full h-full rounded-lg overflow-hidden bg-black
                ${fullscreen ? `object-cover h-screen w-screen` : "object-contain"}
              `}
            tabIndex={0}
            onMouseEnter={() => {
              if (!fullscreen) enterPlayerPanel();
            }}
            onMouseLeave={() => {
              if (!fullscreen && isPlaying) leavePlayerPanel();
            }}
            onMouseMove={() => {
              if (fullscreen && isPlaying) {
                handleMouseMove();
              } else if (fullscreen && !isPlaying) {
                enterPlayerPanel();
              }
            }}
          >
            <MediaProvider />
            <div>
              <>
                {isPlayerPanel && (
                  <>
                    <div
                      className="absolute top-0 left-0 w-full h-full inset-shadow-md"
                      onClick={() => {
                        toggleAutoPlay();
                        closeSettingPanel();
                      }}
                    />
                    <div className="absolute top-0">
                      <div className="text-white bg-black">
                        <div className="bg-bg/90 rounded-lg py-2 m-2">
                          <ButtonEpisode fullscreen={fullscreen} />

                          {isOpenListEpisode && <EpisodeList fullscreen={fullscreen} />}
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-24 px-2">
                      {/* <ButtonSkips skips={propertiesEpisode?.skips} currentTime={currentTime} player={player} fullscreen={fullscreen} /> */}
                    </div>
                    <div className="absolute bottom-12 px-2">
                      <EpisodeName episode={currentEpisode ? currentEpisode : Array.isArray(video) ? video[0] : video} fullscreen={fullscreen} />
                    </div>
                    <div className="absolute bottom-0 w-full pb-1">
                      <div className="px-2">
                        <VideoRewind duration={duration} currentTime={currentTime} player={mediaPlayer} />

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-5">
                            <ButtonPlaying mediaPlayer={mediaPlayer} index={videoIndex.toString()} />

                            <VolumeInput player={mediaPlayer} muted={muted} volume={volume} />

                            <VideoTime formatTime={formatTime} currentTime={currentTime} duration={duration} />
                          </div>
                          <div className="flex items-center gap-5">
                            <SettingPlayer fullscreen={fullscreen} quality={quality} qualities={qualities} canSetQuality={canSetQuality} />

                            <ButtonSettingPlayer />

                            <ButtonFullscreen mediaPlayer={mediaPlayer} fullscreen={fullscreen} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            </div>
          </MediaPlayer>
        </div>
      </div>
    </>
  );
};
