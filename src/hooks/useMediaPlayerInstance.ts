import { usePlayerStore } from "@/store/usePlayerStore";
import type { IEpisode, ILatestEpisode } from "@/types/types";
import { useMediaStore, type MediaPlayerInstance } from "@vidstack/react";
import { useEffect, useMemo, useRef, useState } from "react";

export const useMediaPlayerInstance = (video: IEpisode | ILatestEpisode, playerId: string) => {
  const player = useRef<MediaPlayerInstance>(null);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [listEpisode, setListEpisode] = useState<IListPlayer[] | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<IHls | null>(null);
  const [isOpenSettingPlayer, setIsOpenSettingPlayer] = useState<boolean>(false);
  const [isOpenSettingQualitiesPlayer, setIsOpenSettingQualitiesPlayer] = useState<boolean>(false);
  const [isOpenListEpisode, setIsOpenListEpisode] = useState<boolean>(false);
  const [selectedEpisode, setSelectedEpisode] = useState<string>("");
  const [isPlayerPanel, setIsPlayerPanel] = useState<boolean>(false);
  const [isVolumeInput, setIsVolumeInput] = useState<boolean>(false);
  const [propertiesEpisode, setPropertiesEpisode] = useState<IListPlayer | null>(null);

  const { activePlayerId, setActivePlayerId } = usePlayerStore();

  const { fullscreen, qualities, canSetQuality, currentTime, duration, volume, muted, quality } = useMediaStore(player);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const episodeSelection = (label: string, episode: IListPlayer) => {
    setSelectedEpisode(label);
    handlerCurrentEpisode(episode.hls);
    leavePlayerPanel();
    closeListEpisode();
    closeSettingQualitiesPlayer();
    setPlaying(false);
  };

  const closeListEpisode = () => {
    setIsOpenListEpisode(false);
  };

  const openListEpisode = () => {
    setIsOpenListEpisode(true);
  };

  const toggleOpenListEpisode = () => {
    setIsOpenListEpisode(!isOpenListEpisode);
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

  const closeSettingPanel = () => {
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
      setActivePlayerId(playerId);
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

  useEffect(() => {
    if (selectedEpisode === "") {
      setSelectedEpisode("Эпизод 1");
    }
  }, [selectedEpisode]);

  useEffect(() => {
    if (!listEpisode || !selectedEpisode) return;

    const episode = listEpisode ? Object.values(listEpisode).find((episode) => `Эпизод ${episode.episode}` === selectedEpisode) : null;

    if (episode) {
      setPropertiesEpisode(episode);
    }
  }, [selectedEpisode, listEpisode]);

  useEffect(() => {
    if (isPlaying) {
      setActivePlayerId(playerId);
    }
  }, [isPlaying, playerId, setActivePlayerId]);

  useEffect(() => {
    if (activePlayerId && activePlayerId !== playerId && isPlaying) {
      player.current?.pause();
      setPlaying(false);
    }
  }, [activePlayerId, playerId, isPlaying]);

  useEffect(() => {
    return () => {
      if (activePlayerId === playerId) {
        setActivePlayerId(null);
      }
    };
  }, [activePlayerId, playerId, setActivePlayerId]);

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
    toggleOpenListEpisode,
    closeListEpisode,
    openListEpisode,
    selectedEpisode,
    setSelectedEpisode,
    isOpenListEpisode,
    episodeSelection,
    propertiesEpisode,
    closeSettingPanel,
    videoHost,
  };
};
