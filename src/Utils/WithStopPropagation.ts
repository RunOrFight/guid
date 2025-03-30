import { MouseEventHandler } from "react";

const stopPropagation: MouseEventHandler = (e) => e.stopPropagation();

const withStopPropagation =
  (callback: () => void): MouseEventHandler =>
  (e) => {
    stopPropagation(e);
    callback();
  };

export { withStopPropagation, stopPropagation };
