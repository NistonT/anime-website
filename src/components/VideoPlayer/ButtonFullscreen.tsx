import { Expand, Shrink } from "lucide-react";

type Props = {
  toggleFullscreen: () => void;
  fullscreen: boolean;
};

export const ButtonFullscreen = ({ toggleFullscreen, fullscreen }: Props) => {
  return (
    <button onClick={toggleFullscreen} type="button" className="text-white">
      {fullscreen ? <Shrink /> : <Expand />}
    </button>
  );
};
