type Props = {
  name_rus: string | null;
  name_eng: string | null;
  fullscreen: boolean;
};

export const EpisodeName = ({ name_rus, name_eng, fullscreen }: Props) => {
  return (
    <div className={`text-white font-openSansItalic ${fullscreen ? "text-sm" : null}`}>
      <div>{name_rus ? name_rus : name_eng} </div>
    </div>
  );
};
