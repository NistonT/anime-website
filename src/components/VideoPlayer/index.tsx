import { useMediaPlayerInstance } from "@/hooks/useMediaPlayerInstance";
import type { ITitle } from "@/types/title.type";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { Pause, Play, Volume2, VolumeOff } from "lucide-react";
import { m } from "motion/react";
import { ButtonFullscreen } from "./ButtonFullscreen";
import { ButtonSettingPlayer } from "./ButtonSettingPlayer";
import { SettingPlayer } from "./SettingPlayer";
import { VideoTime } from "./VideoTime";

type Props = {
  video: ITitle;
};

export const VideoPlayer = ({ video }: Props) => {
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
  } = useMediaPlayerInstance(video);

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
          {isPlayerPanel && (
            <>
              <div className="absolute top-0 left-0 w-full h-full inset-shadow-md" />
              <div className="absolute top-0">
                <div className="text-white bg-black">
                  <select
                    onChange={(event) => {
                      const selectedEpisodeEvent = event.target.value;
                      const selectEpisode = listEpisode
                        ? Object.values(listEpisode).find((episode) => {
                            console.log(episode.name || `Эпизод ${episode.episode}`);
                            return episode.name || `Эпизод ${episode.episode}` === selectedEpisodeEvent;
                          })
                        : null;
                      if (selectEpisode) handlerCurrentEpisode(selectEpisode.hls);
                    }}
                  >
                    {listEpisode
                      ? Object.values(listEpisode).map((episode) => (
                          <option key={episode.uuid} value={episode.name || `Эпизод ${episode.episode}`}>
                            {episode.name || `Эпизод ${episode.episode}`}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
              <div className="absolute bottom-0 w-full pb-1">
                <div className="px-2">
                  <div>
                    <div>
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={(e) => {
                          const time = parseFloat(e.target.value);
                          if (!isNaN(time) && player.current) {
                            player.current.currentTime = time;
                          }
                        }}
                        className="w-full relative overflow-hidden z-20 border-none h-1 hover:h-2.5 transition-all accent-main"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                      <button className="text-white" onClick={toggleAutoPlay} type="button">
                        {isPlaying ? <Pause /> : <Play />}
                      </button>
                      <div className="flex items-center gap-2" onMouseEnter={enterVolumeInput} onMouseLeave={leaveVolumeInput}>
                        <button
                          onClick={() => {
                            if (player.current) {
                              player.current.muted = !player.current.muted;
                            }
                          }}
                          className="text-white hover:text-gray-300"
                        >
                          {muted ? <VolumeOff /> : <Volume2 />}
                        </button>
                        {isVolumeInput && (
                          <m.input
                            initial={{ width: 0 }}
                            animate={{ width: 96 }}
                            key="box"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => {
                              const vol = parseFloat(e.target.value);
                              if (!isNaN(vol) && player.current) {
                                player.current.volume = vol;
                                player.current.muted = false;
                              }
                            }}
                            className="w-24 h-2 accent-white"
                          />
                        )}
                      </div>
                      <VideoTime formatTime={formatTime} currentTime={currentTime} duration={duration} />
                    </div>
                    <div className="flex items-center gap-5">
                      <SettingPlayer
                        fullscreen={fullscreen}
                        openSettingQualitiesPlayer={openSettingQualitiesPlayer}
                        quality={quality}
                        closeSettingQualitiesPlayer={closeSettingQualitiesPlayer}
                        qualities={qualities}
                        canSetQuality={canSetQuality}
                        toggleOpenSettingPlayer={toggleOpenSettingPlayer}
                        isOpenSettingPlayer={isOpenSettingPlayer}
                        isOpenSettingQualitiesPlayer={isOpenSettingQualitiesPlayer}
                      />

                      <ButtonSettingPlayer toggleOpenSettingPlayer={toggleOpenSettingPlayer} />

                      <ButtonFullscreen toggleFullscreen={toggleFullscreen} fullscreen={fullscreen} />
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
