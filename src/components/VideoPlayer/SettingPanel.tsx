import type { VideoQuality } from "@vidstack/react";
import { SlidersHorizontal } from "lucide-react";
import { m } from "motion/react";
import { Button } from "../ui/Button";

type Props = {
  fullscreen: boolean;
  openSettingQualitiesPlayer: () => void;
  quality: VideoQuality | null;
};

export const SettingPanel = ({ fullscreen, openSettingQualitiesPlayer, quality }: Props) => {
  return (
    <m.div initial={{ opacity: 0, bottom: 0 }} animate={{ opacity: 1, bottom: 20 }}>
      <Button variant={"setting"} size={"lg"} className={`${fullscreen ? "text-sm" : null}`} onClick={openSettingQualitiesPlayer}>
        <div className="flex items-center gap-2">
          <SlidersHorizontal />
          Качество
        </div>
        {quality?.height}p
      </Button>
    </m.div>
  );
};
