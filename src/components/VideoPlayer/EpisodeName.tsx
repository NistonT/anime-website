import type { IEpisode } from "@/types/types";

type Props = {
  episode: IEpisode;
  fullscreen: boolean;
};

export const EpisodeName = ({ episode, fullscreen }: Props) => {
  return (
    <div className={`text-white font-openSansItalic ${fullscreen ? "text-sm" : null}`}>
      <div>Эпизод {episode.ordinal}</div>
      <div>{episode.name}</div>
    </div>
  );
};
