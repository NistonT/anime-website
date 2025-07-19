import type { VideoQuality } from "@vidstack/react";
import { Check } from "lucide-react";
import { Button } from "../ui/Button";

type Props = {
  qualities: VideoQuality[];
  canSetQuality: boolean;
  fullscreen: boolean;
  toggleOpenSettingPlayer: () => void;
};

export const QualitiesList = ({ qualities, toggleOpenSettingPlayer, canSetQuality, fullscreen }: Props) => {
  return (
    <>
      {qualities.map((q, index) => (
        <Button
          variant={"setting"}
          size={"lg"}
          key={index}
          onClick={() => {
            q.selected = true;
            toggleOpenSettingPlayer();
          }}
          disabled={!canSetQuality}
          className={`${!canSetQuality && "opacity-50 cursor-not-allowed"} ${fullscreen ? "text-sm" : null}`}
        >
          <div className="flex items-center gap-2">
            {q.selected ? <Check /> : <div className="w-4" />}
            {q.height}p
          </div>
        </Button>
      ))}
    </>
  );
};
