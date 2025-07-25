import { useAutoPlayMediaPlayer } from "@/store/useAutoPlayMediaPlayer";
import { usePlayerMediaPanel } from "@/store/usePlayerMediaPanel";
import { usePlayerStore } from "@/store/usePlayerStore";
import type { IEpisode } from "@/types/types";
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore } from "@vidstack/react";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { useEffect, useMemo, useRef } from "react";
import { ButtonFullscreen } from "./ButtonFullscreen";
import { ButtonPlaying } from "./ButtonPlaying";

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
  const { fullscreen } = useMediaStore(mediaPlayer);
  const { isPlaying, setPlaying } = useAutoPlayMediaPlayer();
  const { enterPlayerPanel, leavePlayerPanel, setListEpisode, listEpisode, selectedEpisode, setSelectedEpisode } = usePlayerMediaPanel();
  const { setActivePlayerId, activePlayerId } = usePlayerStore();

  const playlist = useMemo(
    () =>
      [
        "#EXTM3U",
        "#EXT-X-VERSION:4",
        "#EXT-X-PLAYLIST-TYPE:VOD",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=720x480",
        Array.isArray(video) ? video[0].hls_480 : video.hls_480,
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=1280x720",
        Array.isArray(video) ? video[0].hls_720 : video.hls_720,
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=1920x1080",
        Array.isArray(video) ? video[0].hls_1080 : video.hls_1080,
      ].join("\n"),
    [video],
  );

  // currentEpisode
  //   ? `https://${videoHost}${currentEpisode.sd}`
  //   : video.player.list?.[1]?.hls?.sd
  //     ? `https://${videoHost}${video.player.list[1].hls.sd}`
  //     : "",

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
              <ButtonPlaying mediaPlayer={mediaPlayer} index={videoIndex.toString()} />
              <ButtonFullscreen mediaPlayer={mediaPlayer} fullscreen={fullscreen} />
            </div>
          </MediaPlayer>
        </div>
      </div>
    </>
  );
};
