import type { IName, IPoster } from "@/types/types";

type Props = {
  poster: IPoster;
  name: IName;
  year: number;
  episodes_total: number | null;
  className?: string;
};

export const CardReleaseLatest = ({ poster, name, year, episodes_total, className }: Props) => {
  return (
    <div className={`group relative max-w-56 cursor-pointer`}>
      <div className="overflow-hidden rounded-xl relative">
        <img
          className="rounded-xl transition-transform duration-300 group-hover:scale-105 relative w-full h-full"
          src={`${import.meta.env.VITE_URL}${poster.optimized.preview}`}
          alt={name.main}
        />

        <div
          className={`absolute flex flex-col items-center justify-center rounded-xl inset-0 bg-black/50 bg-opacity-60 p-4  group-hover:opacity-100 transition-opacity duration-300 ${className}`}
        >
          <h3 className="font-netflix text-white text-lg font-semibold text-center">{name.main}</h3>
          <p className="font-netflix text-gray-200 text-sm">{year}</p>
          <p className="font-netflix text-gray-300 text-sm">Эпизодов: {episodes_total ? episodes_total : "Еще не закончен"}</p>
        </div>
      </div>
    </div>
  );
};
