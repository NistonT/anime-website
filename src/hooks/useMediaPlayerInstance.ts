import type { ITitle } from "@/types/title.type";
import type { IHls, IListPlayer } from "@/types/types";
import { useMediaStore, type MediaPlayerInstance } from "@vidstack/react";
import { useEffect, useMemo, useRef, useState } from "react";

export const useMediaPlayerInstance = (video: ITitle) => {
  const [videoHost] = useState(video.player.host); // Состояние хоста
  const player = useRef<MediaPlayerInstance>(null); // Плеер
  const [isPlaying, setPlaying] = useState<boolean>(false); // Играет ли видос
  const [listEpisode, setListEpisode] = useState<IListPlayer[] | null>(null); // Лист эпизодов
  const [currentEpisode, setCurrentEpisode] = useState<IHls | null>(null); // В данный момент эпизод
  const [isOpenSettingPlayer, setIsOpenSettingPlayer] = useState<boolean>(false); // Открыты ли настройки плеера
  const [isOpenSettingQualitiesPlayer, setIsOpenSettingQualitiesPlayer] = useState<boolean>(false); // Открыты ли настройки качества
  const [isPlayerPanel, setIsPlayerPanel] = useState<boolean>(false); // Открыта ли панель в плеере
  const [isVolumeInput, setIsVolumeInput] = useState<boolean>(false); // Показан ли диапазон звука

  const { fullscreen, qualities, canSetQuality, currentTime, duration, volume, muted, quality } = useMediaStore(player);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Отлеживание движение мыши
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

  const openSettingQualitiesPlayer = () => {
    setIsOpenSettingQualitiesPlayer(true);
  };

  const closeSettingQualitiesPlayer = () => {
    setIsOpenSettingQualitiesPlayer(false);
  };

  const enterVolumeInput = () => {
    setIsVolumeInput(true);
  };

  const leaveVolumeInput = () => {
    setIsVolumeInput(false);
  };

  const enterPlayerPanel = () => {
    setIsPlayerPanel(true);
  };

  const leavePlayerPanel = () => {
    setIsPlayerPanel(false);
    setIsOpenSettingPlayer(false);
  };

  const toggleOpenSettingPlayer = () => {
    setIsOpenSettingPlayer(!isOpenSettingPlayer);

    if (isOpenSettingQualitiesPlayer) {
      closeSettingQualitiesPlayer();
    }
  };

  const handlerCurrentEpisode = (episode: IHls) => {
    setCurrentEpisode(episode);
  };

  const toggleFullscreen = () => {
    if (fullscreen) {
      player.current?.exitFullscreen();
      setIsOpenSettingPlayer(false);
    } else {
      player.current?.enterFullscreen();
      setIsOpenSettingPlayer(false);
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

  // Качества видео
  const playlist = useMemo(
    () =>
      [
        "#EXTM3U",
        "#EXT-X-VERSION:4",
        "#EXT-X-PLAYLIST-TYPE:VOD",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=720x480",
        currentEpisode
          ? `https://${videoHost}${currentEpisode.sd}`
          : video.player.list?.[1]?.hls?.sd
            ? `https://${videoHost}${video.player.list[1].hls.sd}`
            : "",
        "#EXT-X-STREAM-INF:RESOLUTION=1280x720",
        currentEpisode
          ? `https://${videoHost}${currentEpisode.hd}`
          : video.player.list?.[1]?.hls?.hd
            ? `https://${videoHost}${video.player.list[1].hls.hd}`
            : "",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=1920x1080",
        currentEpisode
          ? `https://${videoHost}${currentEpisode.fhd}`
          : video.player.list?.[1]?.hls?.fhd
            ? `https://${videoHost}${video.player.list[1].hls.fhd}`
            : "",
      ].join("\n"),
    [videoHost, video.player.list, currentEpisode],
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

  const videoSrc = useMemo(() => {
    const blob = new Blob([playlist], {
      type: "application/x-mpegurl",
    });
    return URL.createObjectURL(blob);
  }, [playlist]);

  useEffect(() => {
    if (video.player.list) {
      setListEpisode(video.player.list);
    }
  }, [video, listEpisode]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [fullscreen, isPlaying]);

  return {
    fullscreen,
    qualities,
    canSetQuality,
    currentTime,
    duration,
    volume,
    muted,
    quality,
    videoSrc,
    formatTime,
    player,
    toggleAutoPlay,
    toggleFullscreen,
    handlerCurrentEpisode,
    toggleOpenSettingPlayer,
    enterVolumeInput,
    leaveVolumeInput,
    enterPlayerPanel,
    leavePlayerPanel,
    openSettingQualitiesPlayer,
    handleMouseMove,
    isPlayerPanel,
    isVolumeInput,
    isPlaying,
    listEpisode,
    isOpenSettingPlayer,
    isOpenSettingQualitiesPlayer,
    closeSettingQualitiesPlayer,
  };
};
