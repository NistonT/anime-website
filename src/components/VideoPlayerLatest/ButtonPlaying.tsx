import { Pause, Play } from "lucide-react";

type Props = {
  togglePlaying: () => void;
  isPlaying: boolean;
};

export const ButtonPlaying = ({ togglePlaying, isPlaying }: Props) => {
  return (
    <button className="text-white" onClick={togglePlaying} type="button">
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
};
