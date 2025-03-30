import { FC, Ref } from "react";
import classes from "./Field.module.css";
import { Input } from "../Input/Input.tsx";
import { Error } from "../Error/Error.tsx";

interface IFieldProps {
  label: string;
  id: string;
  error?: string | null;
  onChange?: (value: string) => void;
  inputRef?: Ref<HTMLInputElement>;
  inputValue?: string;
}

const Field: FC<IFieldProps> = ({
  label,
  id,
  error,
  onChange,
  inputRef,
  inputValue,
}) => {
  return (
    <div className={classes.field}>
      <label htmlFor={id}>{label}</label>
      <Input id={id} onChange={onChange} ref={inputRef} value={inputValue} />
      {error ? <Error>{error}</Error> : null}
    </div>
  );
};

export { Field };
