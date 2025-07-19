import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/Button";

type Props = {
  fullscreen: boolean;
  isOpenListEpisode: boolean;
  toggleOpenListEpisode: () => void;
  selectedEpisode: string;
};

export const ButtonEpisode = ({ fullscreen, isOpenListEpisode, toggleOpenListEpisode, selectedEpisode }: Props) => {
  return (
    <Button variant={"setting"} size={"lg"} className={`${fullscreen ? "text-sm" : null}`} onClick={toggleOpenListEpisode}>
      {isOpenListEpisode ? (
        <div className="flex items-center justify-between w-full">
          <div>Выберите эпизод</div> <ChevronUp />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div>{selectedEpisode}</div> <ChevronDown />
        </div>
      )}
    </Button>
  );
};
