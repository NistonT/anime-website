import { Pause, Play } from "lucide-react";

type Props = {
  toggleAutoPlay: () => void;
  isPlaying: boolean;
};

export const ButtonPlaying = ({ toggleAutoPlay, isPlaying }: Props) => {
  return (
    <button className="text-white" onClick={toggleAutoPlay} type="button">
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
};
