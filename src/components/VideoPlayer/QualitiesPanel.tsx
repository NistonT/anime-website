import type { VideoQuality } from "@vidstack/react";
import { ChevronLeft } from "lucide-react";
import { m } from "motion/react";
import { Button } from "../ui/Button";
import { QualitiesList } from "./QualitiesList";

type Props = {
  fullscreen: boolean;
  closeSettingQualitiesPlayer: () => void;
  qualities: VideoQuality[];
  canSetQuality: boolean;
  toggleOpenSettingPlayer: () => void;
};

export const QualitiesPanel = ({ fullscreen, closeSettingQualitiesPlayer, qualities, canSetQuality, toggleOpenSettingPlayer }: Props) => {
  return (
    <m.div initial={{ opacity: 0, bottom: 0 }} animate={{ opacity: 1, bottom: 20 }}>
      <Button variant={"setting"} size={"lg"} className={`${fullscreen ? "text-sm" : null}`} onClick={closeSettingQualitiesPlayer}>
        <div className="flex items-center gap-2">
          <ChevronLeft />
          Назад
        </div>
      </Button>
      <div className="border-b-2 border-white my-1" />
      <QualitiesList qualities={qualities} canSetQuality={canSetQuality} fullscreen={fullscreen} toggleOpenSettingPlayer={toggleOpenSettingPlayer} />
    </m.div>
  );
};
