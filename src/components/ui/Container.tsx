import type React from "react";
import type { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const Container: FC<Props> = ({ children }) => {
  return <div className="max-w-[1920px] mx-auto px-10 py-2 bg-bg">{children}</div>;
};
