import type { ITitle } from "@/types/title.type";
import type { IHls, IListPlayer } from "@/types/types";
import { MediaPlayer, MediaPlayerInstance, MediaProvider, useMediaStore } from "@vidstack/react";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { Expand, Pause, Play, Shrink, SlidersHorizontal, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  video: ITitle;
};

export const VideoPlayer = ({ video }: Props) => {
  const [videoHost] = useState(video.player.host);
  const player = useRef<MediaPlayerInstance>(null);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [listEpisode, setListEpisode] = useState<IListPlayer[] | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<IHls | null>(null);
  const { fullscreen, qualities, canSetQuality, currentTime, duration, volume, muted } = useMediaStore(player);
  const [isOpenSettingPlayer, setIsOpenSettingPlayer] = useState<boolean>(false);

  const toggleOpenSettingPlayer = () => {
    setIsOpenSettingPlayer(!isOpenSettingPlayer);
  };

  const handlerCurrentEpisode = (episode: IHls) => {
    setCurrentEpisode(episode);
  };

  const toggleFullscreen = () => {
    if (fullscreen) {
      player.current?.exitFullscreen();
    } else {
      player.current?.enterFullscreen();
    }
  };

  const toggleAutoPlay = () => {
    if (isPlaying) {
      player.current?.pause();
      setPlaying(false);
    } else {
      player.current?.play();
      setPlaying(true);
    }
  };

  const playlist = useMemo(
    () =>
      [
        "#EXTM3U",
        "#EXT-X-VERSION:4",
        "#EXT-X-PLAYLIST-TYPE:VOD",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=720x480",
        currentEpisode
          ? `https://${videoHost}${currentEpisode.sd}`
          : video.player.list?.[1]?.hls?.sd
            ? `https://${videoHost}${video.player.list[1].hls.sd}`
            : "",
        "#EXT-X-STREAM-INF:RESOLUTION=1280x720",
        currentEpisode
          ? `https://${videoHost}${currentEpisode.hd}`
          : video.player.list?.[1]?.hls?.hd
            ? `https://${videoHost}${video.player.list[1].hls.hd}`
            : "",
        "",
        "#EXT-X-STREAM-INF:RESOLUTION=1920x1080",
        currentEpisode
          ? `https://${videoHost}${currentEpisode.fhd}`
          : video.player.list?.[1]?.hls?.fhd
            ? `https://${videoHost}${video.player.list[1].hls.fhd}`
            : "",
      ].join("\n"),
    [videoHost, video.player.list, currentEpisode],
  );

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const videoSrc = useMemo(() => {
    const blob = new Blob([playlist], {
      type: "application/x-mpegurl",
    });
    return URL.createObjectURL(blob);
  }, [playlist]);

  useEffect(() => {
    if (video.player.list) {
      setListEpisode(video.player.list);
    }
  }, [video, listEpisode]);

  if (!video.player) {
    return <div>Видео недоступно</div>;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center p-4 bg-gray-900">
      <div
        className={`relative transition-all duration-300 ${
          fullscreen ? "fixed inset-0 z-50 flex items-center justify-center bg-black" : "w-[800px] h-[450px]"
        }`}
      >
        <MediaPlayer
          title="HLS Видео"
          src={{
            src: videoSrc,
            type: "application/x-mpegurl",
          }}
          style={{
            "--media-video-object-fit": "fill",
          }}
          ref={player}
          className={`
          w-full h-full rounded-lg overflow-hidden bg-black
          ${fullscreen ? `object-cover h-screen w-screen` : "object-contain"}
        `}
          // onClick={toggleAutoPlay}
        >
          <MediaProvider />
          <div className="absolute top-0">
            <div className="text-white bg-black">
              <select
                onChange={(event) => {
                  const selectedEpisodeEvent = event.target.value;
                  const selectEpisode = listEpisode
                    ? Object.values(listEpisode).find((episode) => {
                        console.log(episode.name || `Эпизод ${episode.episode}`);
                        return episode.name || `Эпизод ${episode.episode}` === selectedEpisodeEvent;
                      })
                    : null;
                  if (selectEpisode) handlerCurrentEpisode(selectEpisode.hls);
                }}
              >
                {listEpisode
                  ? Object.values(listEpisode).map((episode) => (
                      <option key={episode.uuid} value={episode.name || `Эпизод ${episode.episode}`}>
                        {episode.name || `Эпизод ${episode.episode}`}
                      </option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className="absolute bottom-0 w-full">
            <div className="px-2">
              <div>
                <div>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => {
                      const time = parseFloat(e.target.value);
                      if (!isNaN(time) && player.current) {
                        player.current.currentTime = time;
                      }
                    }}
                    className="w-full relative overflow-hidden z-20 border-none h-0.5 hover:h-2 transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button onClick={toggleAutoPlay} type="button">
                  {isPlaying ? <Pause /> : <Play />}
                </button>
                <div>
                  <span>{formatTime(currentTime)}-</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (player.current) {
                        player.current.muted = !player.current.muted;
                      }
                    }}
                    className="text-white hover:text-gray-300"
                    title="Мут"
                  >
                    {muted ? <VolumeOff /> : <Volume2 />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                      const vol = parseFloat(e.target.value);
                      if (!isNaN(vol) && player.current) {
                        player.current.volume = vol;
                        player.current.muted = false;
                      }
                    }}
                    className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div className="relative">
                  <button type="button" onClick={toggleOpenSettingPlayer}>
                    <SlidersHorizontal />
                  </button>

                  {isOpenSettingPlayer && (
                    <div className="absolute -top-24 left-0 z-10">
                      {qualities.map((q, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            q.selected = true;
                            toggleOpenSettingPlayer();
                          }}
                          disabled={!canSetQuality}
                          className={`px-3 py-1 rounded text-sm ${
                            q.selected ? "bg-green-500 text-white" : "bg-gray-200"
                          } ${!canSetQuality && "opacity-50 cursor-not-allowed"}`}
                        >
                          {q.height}p
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button onClick={toggleFullscreen} type="button" className="text-white px-3 py-1 rounded hover:bg-gray-700">
                  {fullscreen ? <Shrink /> : <Expand />}
                </button>
              </div>
            </div>
          </div>
        </MediaPlayer>
      </div>
    </div>
  );
};
