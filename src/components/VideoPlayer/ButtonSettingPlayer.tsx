import { Settings } from "lucide-react";

type Props = {
  toggleOpenSettingPlayer: () => void;
};

export const ButtonSettingPlayer = ({ toggleOpenSettingPlayer }: Props) => {
  return (
    <button className="text-white" type="button" onClick={toggleOpenSettingPlayer}>
      <Settings />
    </button>
  );
};
