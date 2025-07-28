type Props = {
  currentTime: number;
  duration: number;
};

export const VideoTime = ({ currentTime, duration }: Props) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="text-white text-xs">
      <span>{formatTime(currentTime)} / </span>
      <span>{formatTime(duration)}</span>
    </div>
  );
};
