import { m } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  fullscreen?: boolean;
  children: ReactNode;
  className?: string;
};

export const AnimatedPlayer = ({ width, height, fullscreen, children }: Props) => {
  return (
    <m.div
      // Начальное состояние
      initial={{ width: 0, height: 0, opacity: 0 }}
      // Конечное состояние (target)
      animate={{
        width: fullscreen ? "100vw" : width,
        height: fullscreen ? "100vh" : height,
        opacity: 1,
      }}
      // Настройки анимации
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1], // nice ease-in-out
        opacity: { duration: 0.3 },
      }}
      // Дополнительные классы и стили
      className={`relative bg-black overflow-hidden ${fullscreen ? "fixed inset-0 z-50 flex items-center justify-center" : "rounded-xl"}`}
      // Важно: установи `style` для динамических размеров
      style={{
        width: fullscreen ? "100vw" : undefined,
        height: fullscreen ? "100vh" : undefined,
      }}
    >
      {children}
    </m.div>
  );
};
