import type React from "react";
import type { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const Container: FC<Props> = ({ children }) => {
  return <div className="container mx-auto">{children}</div>;
};
