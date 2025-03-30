import classes from "./Error.module.css";
import { FC, PropsWithChildren } from "react";

const Error: FC<PropsWithChildren> = ({ children }) => {
  return <div className={classes.error}>{children}</div>;
};

export { Error };
