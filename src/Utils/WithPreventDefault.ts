import { EventHandler, SyntheticEvent } from "react";

const preventDefault = (e: SyntheticEvent) => e.preventDefault();

const withPreventDefault =
  <T extends SyntheticEvent>(callback: () => void): EventHandler<T> =>
  (e) => {
    preventDefault(e);
    callback();
  };

export { withPreventDefault, preventDefault };
