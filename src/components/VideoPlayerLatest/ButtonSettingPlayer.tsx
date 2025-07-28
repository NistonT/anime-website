import { useMediaPlayerLatest } from "@/store/useMediaPlayerLatest";
import { Settings } from "lucide-react";

export const ButtonSettingPlayer = () => {
  const { setSettingPlayer, isSettingPlayer } = useMediaPlayerLatest();

  return (
    <>
      <button className="text-white" type="button" onClick={() => setSettingPlayer(!isSettingPlayer)}>
        <Settings />
      </button>
    </>
  );
};
