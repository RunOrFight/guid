import { ButtonHTMLAttributes, FC } from "react";
import classes from "./Button.module.css";
import clsx from "clsx";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  danger?: boolean;
}

const Button: FC<IButtonProps> = ({
  children,
  className,
  danger,
  loading,
  value,
  ...props
}) => {
  return (
    <button
      disabled={loading}
      {...props}
      className={clsx(classes.button, className, danger && classes.danger)}
    >
      {children || value}
    </button>
  );
};

export { Button };
