import { usePlayerMediaPanel } from "@/store/usePlayerMediaPanel";
import { Check } from "lucide-react";
import { Button } from "../ui/Button";

type Props = {
  fullscreen: boolean;
};

export const EpisodeList = ({ fullscreen }: Props) => {
  const { listEpisode, episodeSelection, selectedEpisode } = usePlayerMediaPanel();

  return (
    <div>
      {listEpisode
        ? Object.values(listEpisode).map((episode) => {
            const label = `Эпизод ${episode.ordinal}`;
            return (
              <Button
                variant={"setting"}
                size={"lg"}
                className={`${fullscreen ? "text-sm" : null}`}
                key={episode.id}
                onClick={() => episodeSelection(label, episode)}
              >
                <div className="flex items-center gap-2">
                  {selectedEpisode === label ? <Check /> : <div className="w-4" />}
                  {label}
                </div>
              </Button>
            );
          })
        : null}
    </div>
  );
};
