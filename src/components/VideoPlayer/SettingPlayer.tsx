import { usePlayerMediaPanel } from "@/store/usePlayerMediaPanel";
import type { VideoQuality } from "@vidstack/react";
import { m } from "motion/react";
import { QualitiesPanel } from "./QualitiesPanel";
import { SettingPanel } from "./SettingPanel";

type Props = {
  fullscreen: boolean;

  quality: VideoQuality | null;

  qualities: VideoQuality[];
  canSetQuality: boolean;
};

export const SettingPlayer = ({ fullscreen, quality, qualities, canSetQuality }: Props) => {
  const { isOpenSettingPlayer, isOpenSettingQualitiesPlayer } = usePlayerMediaPanel();

  return (
    <div className="relative">
      {isOpenSettingPlayer && (
        <m.div className="absolute bottom-5 -right-22 z-10 w-72 mb-2">
          <m.div initial={{ opacity: 0, bottom: 0 }} animate={{ opacity: 1, bottom: 20 }} className="bg-bg/90 rounded-lg py-2">
            {!isOpenSettingQualitiesPlayer && <SettingPanel fullscreen={fullscreen} quality={quality} />}
            {isOpenSettingQualitiesPlayer && <QualitiesPanel fullscreen={fullscreen} qualities={qualities} canSetQuality={canSetQuality} />}
          </m.div>
        </m.div>
      )}
    </div>
  );
};
