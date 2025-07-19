import type { ISkips } from "@/types/types";
import type { MediaPlayerInstance } from "@vidstack/react";
import { useState } from "react";
import { Button } from "../ui/Button";

type Props = {
  skips: ISkips | null | undefined;
  currentTime: number;
  player: React.RefObject<MediaPlayerInstance | null>;
  fullscreen: boolean;
};

export const ButtonSkips = ({ skips, currentTime, player, fullscreen }: Props) => {
  const [startOpening] = useState<number | undefined>(skips?.opening[0]);
  const [endOpening] = useState<number | undefined>(skips?.opening[1]);
  const [startEnding] = useState<number | undefined>(skips?.ending[0]);
  const [endEnding] = useState<number | undefined>(skips?.ending[1]);

  return (
    <>
      {startOpening! <= currentTime && currentTime <= endOpening! ? (
        <Button
          variant={"setting"}
          size={"lg"}
          className={`${fullscreen ? "text-sm" : null}`}
          onClick={() => {
            if (player.current && endOpening) {
              player.current.currentTime = endOpening;
            }
          }}
        >
          Пропустить
        </Button>
      ) : null}

      {startEnding! <= currentTime && currentTime <= endEnding! ? (
        <Button
          variant={"setting"}
          size={"lg"}
          className={`${fullscreen ? "text-sm" : null}`}
          onClick={() => {
            if (player.current && endEnding) {
              player.current.currentTime = endEnding;
            }
          }}
        >
          Пропустить
        </Button>
      ) : null}
    </>
  );
};
