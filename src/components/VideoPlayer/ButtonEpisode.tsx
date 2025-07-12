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
      {isOpenListEpisode ? "Выберите эпизод" : selectedEpisode}
    </Button>
  );
};
