import type { VideoQuality } from "@vidstack/react";
import { m } from "motion/react";
import { QualitiesPanel } from "./QualitiesPanel";
import { SettingPanel } from "./SettingPanel";

type Props = {
  fullscreen: boolean;
  openSettingQualitiesPlayer: () => void;
  quality: VideoQuality | null;
  closeSettingQualitiesPlayer: () => void;
  qualities: VideoQuality[];
  canSetQuality: boolean;
  toggleOpenSettingPlayer: () => void;
  isOpenSettingPlayer: boolean;
  isOpenSettingQualitiesPlayer: boolean;
};

export const SettingPlayer = ({
  fullscreen,
  openSettingQualitiesPlayer,
  quality,
  closeSettingQualitiesPlayer,
  qualities,
  canSetQuality,
  toggleOpenSettingPlayer,
  isOpenSettingPlayer,
  isOpenSettingQualitiesPlayer,
}: Props) => {
  return (
    <div className="relative">
      {isOpenSettingPlayer && (
        <m.div className="absolute bottom-5 -right-22 z-10 w-72 mb-2">
          <m.div initial={{ opacity: 0, bottom: 0 }} animate={{ opacity: 1, bottom: 20 }} className="bg-bg/90 rounded-lg py-2">
            {!isOpenSettingQualitiesPlayer && (
              <SettingPanel fullscreen={fullscreen} openSettingQualitiesPlayer={openSettingQualitiesPlayer} quality={quality} />
            )}
            {isOpenSettingQualitiesPlayer && (
              <QualitiesPanel
                fullscreen={fullscreen}
                closeSettingQualitiesPlayer={closeSettingQualitiesPlayer}
                qualities={qualities}
                canSetQuality={canSetQuality}
                toggleOpenSettingPlayer={toggleOpenSettingPlayer}
              />
            )}
          </m.div>
        </m.div>
      )}
    </div>
  );
};
