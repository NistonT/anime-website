import type { IEnding, IOpening } from "@/types/types";
import type { MediaPlayerInstance } from "@vidstack/react";
import { useState } from "react";
import { Button } from "../ui/Button";

type Props = {
  opening: IOpening | null;
  ending: IEnding | null;
  player: React.RefObject<MediaPlayerInstance | null>;
  fullscreen: boolean;
  currentTime: number;
};

export const ButtonSkips = ({ opening, ending, player, fullscreen, currentTime }: Props) => {
  const [startOpening] = useState<number | null | undefined>(opening?.start);
  const [endOpening] = useState<number | null | undefined>(opening?.stop);
  const [startEnding] = useState<number | null | undefined>(ending?.start);
  const [endEnding] = useState<number | null | undefined>(ending?.stop);

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
