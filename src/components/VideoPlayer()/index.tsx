import { useMediaPlayerInstance } from "@/hooks/useMediaPlayerInstance";
import type { IEpisode } from "@/types/types";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { PlayerPanel } from "./PlayerPanel";

type Props = {
  video: IEpisode;
  index: number;
  width?: number;
  height?: number;
  className?: string;
};

export const VideoPlayer = ({ video, index, width, height, className }: Props) => {
  const {
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
    // listEpisode,
    isOpenSettingPlayer,
    isOpenSettingQualitiesPlayer,
    closeSettingQualitiesPlayer,
    toggleOpenListEpisode,
    selectedEpisode,
    isOpenListEpisode,
    // episodeSelection,
    // propertiesEpisode,
    closeSettingPanel,
    // videoHost,
  } = useMediaPlayerInstance(video, String(index));

  if (!video.id) {
    return <div>Видео недоступно</div>;
  }

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

          <PlayerPanel
            isPlayerPanel={isPlayerPanel}
            toggleAutoPlay={toggleAutoPlay}
            isPlaying={isPlaying}
            fullscreen={fullscreen}
            isOpenListEpisode={isOpenListEpisode}
            toggleOpenListEpisode={toggleOpenListEpisode}
            selectedEpisode={selectedEpisode}
            toggleFullscreen={toggleFullscreen}
            toggleOpenSettingPlayer={toggleOpenSettingPlayer}
            player={player}
            muted={muted}
            // listEpisode={listEpisode}
            // episodeSelection={episodeSelection}
            // propertiesEpisode={propertiesEpisode}
            qualities={qualities}
            canSetQuality={canSetQuality}
            closeSettingQualitiesPlayer={closeSettingQualitiesPlayer}
            openSettingQualitiesPlayer={openSettingQualitiesPlayer}
            quality={quality}
            duration={duration}
            currentTime={currentTime}
            formatTime={formatTime}
            enterVolumeInput={enterVolumeInput}
            leaveVolumeInput={leaveVolumeInput}
            volume={volume}
            isVolumeInput={isVolumeInput}
            isOpenSettingPlayer={isOpenSettingPlayer}
            isOpenSettingQualitiesPlayer={isOpenSettingQualitiesPlayer}
            closeSettingPanel={closeSettingPanel}
          />
        </MediaPlayer>
      </div>
    </div>
  );
};
