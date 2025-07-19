import type { MediaPlayerInstance, VideoQuality } from "@vidstack/react";
import { ButtonPlaying } from "./ButtomPlaying";
import { ButtonEpisode } from "./ButtonEpisode";
import { ButtonFullscreen } from "./ButtonFullscreen";
import { ButtonSettingPlayer } from "./ButtonSettingPlayer";
import { SettingPlayer } from "./SettingPlayer";
import { VideoRewind } from "./VideoRewind";
import { VideoTime } from "./VideoTime";
import { VolumeInput } from "./VolumeInput";

type Props = {
  isPlayerPanel: boolean;
  toggleAutoPlay: () => void;
  isPlaying: boolean;
  fullscreen: boolean;
  isOpenListEpisode: boolean;
  toggleOpenListEpisode: () => void;
  selectedEpisode: string;
  toggleFullscreen: () => void;
  toggleOpenSettingPlayer: () => void;
  player: React.RefObject<MediaPlayerInstance | null>;
  muted: boolean;
  // listEpisode: IListPlayer[] | null;
  // episodeSelection: (label: string, episode: IListPlayer) => void;
  // propertiesEpisode: IListPlayer | null;
  qualities: VideoQuality[];
  canSetQuality: boolean;
  closeSettingQualitiesPlayer: () => void;
  openSettingQualitiesPlayer: () => void;
  quality: VideoQuality | null;
  duration: number;
  currentTime: number;
  formatTime: (seconds: number) => string;
  enterVolumeInput: () => void;
  leaveVolumeInput: () => void;
  volume: number;
  isVolumeInput: boolean;
  isOpenSettingPlayer: boolean;
  isOpenSettingQualitiesPlayer: boolean;
  closeSettingPanel: () => void;
};

export const PlayerPanel = ({
  toggleAutoPlay,
  isPlaying,
  isPlayerPanel,
  fullscreen,
  isOpenListEpisode,
  toggleOpenListEpisode,
  selectedEpisode,
  toggleFullscreen,
  toggleOpenSettingPlayer,
  closeSettingPanel,
  player,
  muted,
  // listEpisode,
  // episodeSelection,
  // propertiesEpisode,
  qualities,
  canSetQuality,
  closeSettingQualitiesPlayer,
  openSettingQualitiesPlayer,
  quality,
  duration,
  currentTime,
  formatTime,
  enterVolumeInput,
  leaveVolumeInput,
  volume,
  isVolumeInput,
  isOpenSettingPlayer,
  isOpenSettingQualitiesPlayer,
}: Props) => {
  return (
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
                <ButtonEpisode
                  fullscreen={fullscreen}
                  isOpenListEpisode={isOpenListEpisode}
                  toggleOpenListEpisode={toggleOpenListEpisode}
                  selectedEpisode={selectedEpisode}
                />

                {/* {isOpenListEpisode && (
                  <EpisodeList
                    listEpisode={listEpisode}
                    fullscreen={fullscreen}
                    episodeSelection={episodeSelection}
                    selectedEpisode={selectedEpisode}
                  />
                )} */}
              </div>
            </div>
          </div>
          {/* <div className="absolute bottom-24 px-2">
            <ButtonSkips skips={propertiesEpisode?.skips} currentTime={currentTime} player={player} fullscreen={fullscreen} />
          </div>
          <div className="absolute bottom-12 px-2">
            <EpisodeName episode={propertiesEpisode?.episode} name={propertiesEpisode?.name} fullscreen={fullscreen} />
          </div> */}
          <div className="absolute bottom-0 w-full pb-1">
            <div className="px-2">
              <VideoRewind duration={duration} currentTime={currentTime} player={player} />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <ButtonPlaying toggleAutoPlay={toggleAutoPlay} isPlaying={isPlaying} player={player} />

                  <VolumeInput
                    enterVolumeInput={enterVolumeInput}
                    leaveVolumeInput={leaveVolumeInput}
                    player={player}
                    muted={muted}
                    volume={volume}
                    isVolumeInput={isVolumeInput}
                  />

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
    </>
  );
};
