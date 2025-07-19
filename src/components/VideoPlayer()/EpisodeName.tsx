type Props = {
  episode: number | null | undefined;
  name: string | null | undefined;
  fullscreen: boolean;
};

export const EpisodeName = ({ episode, name, fullscreen }: Props) => {
  return (
    <div className={`text-white font-openSansItalic ${fullscreen ? "text-sm" : null}`}>
      <div>Эпизод {episode}</div>
      <div>{name}</div>
    </div>
  );
};
