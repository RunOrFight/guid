import { FC, InputHTMLAttributes, Ref } from "react";
import classes from "./Input.module.css";

interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: string) => void;
  ref?: Ref<HTMLInputElement>;
}

const Input: FC<IInputProps> = ({ onChange, ...props }) => {
  return (
    <input
      {...props}
      onChange={(e) => onChange?.(e.target.value)}
      className={classes.input}
    />
  );
};

export { Input };
