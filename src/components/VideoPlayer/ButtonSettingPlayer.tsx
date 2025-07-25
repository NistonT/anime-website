import { usePlayerMediaPanel } from "@/store/usePlayerMediaPanel";
import { Settings } from "lucide-react";

export const ButtonSettingPlayer = () => {
  const { toggleOpenSettingPlayer } = usePlayerMediaPanel();

  return (
    <button className="text-white" type="button" onClick={toggleOpenSettingPlayer}>
      <Settings />
    </button>
  );
};
