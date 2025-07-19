import type { IListPlayer } from "@/types/types";
import { Check } from "lucide-react";
import { Button } from "../ui/Button";

type Props = {
  listEpisode: IListPlayer[] | null;
  fullscreen: boolean;
  episodeSelection: (label: string, episode: IListPlayer) => void;
  selectedEpisode: string;
};

export const EpisodeList = ({ listEpisode, fullscreen, episodeSelection, selectedEpisode }: Props) => {
  return (
    <div>
      {listEpisode
        ? Object.values(listEpisode).map((episode) => {
            const label = `Эпизод ${episode.episode}`;
            return (
              <Button
                variant={"setting"}
                size={"lg"}
                className={`${fullscreen ? "text-sm" : null}`}
                key={episode.uuid}
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
