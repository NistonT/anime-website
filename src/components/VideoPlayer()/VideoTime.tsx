type Props = {
  formatTime: (seconds: number) => string;
  currentTime: number;
  duration: number;
};

export const VideoTime = ({ formatTime, currentTime, duration }: Props) => {
  return (
    <div className="text-white text-xs">
      <span>{formatTime(currentTime)} / </span>
      <span>{formatTime(duration)}</span>
    </div>
  );
};
