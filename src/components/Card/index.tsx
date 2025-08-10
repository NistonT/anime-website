import type { IName, IPoster } from "@/types/types";

type Props = {
  poster: IPoster;
  name: IName;
  year: number;
  episodes_total: number | null;
  className?: string;
};

export const Card = ({ poster, name, year, episodes_total, className }: Props) => {
  return (
    <div className={`group relative max-w-56 cursor-pointer ${className}`}>
      <div className="overflow-hidden rounded-xl">
        <img
          className="rounded-xl transition-transform duration-300 group-hover:scale-105"
          src={`${import.meta.env.VITE_URL}${poster.optimized.preview}`}
          alt={name.main}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/50 bg-opacity-60 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-netflix text-white text-lg font-semibold text-center">{name.main}</h3>
          <p className="font-netflix text-gray-200 text-sm">{year}</p>
          <p className="font-netflix text-gray-300 text-sm">Эпизодов: {episodes_total ? episodes_total : "Еще не закончен"}</p>
        </div>
      </div>
    </div>
  );
};
