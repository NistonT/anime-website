import type { ITitle } from "@/types/title.type";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/base.css";
import { useRef, useState } from "react";
import { VideoController } from "./VideoController";

type Props = {
  video: ITitle;
};

export const VideoPlayer = ({ video }: Props) => {
  const [videoHost] = useState(video.player.host);
  const videoUrl = `https://${videoHost}${video.player.list[1].hls.fhd}`;

  const playerRef = useRef(null);

  return (
    <div className="video-player">
      <div>Видео код: {video.code}</div>

      {/* Vidstack Player */}
      <MediaPlayer title="HLS Видео" src={videoUrl} viewType="video" ref={playerRef}>
        <MediaProvider />
        <VideoController playerRef={playerRef} />
      </MediaPlayer>
    </div>
  );
};
