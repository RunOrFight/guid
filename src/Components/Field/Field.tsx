import { FC } from "react";
import classes from "./Field.module.css";
import { Input } from "../Input/Input.tsx";

interface IFieldProps {
  label: string;
  id: string;
  error?: string | null;
  onChange?: (value: string) => void;
}

const Field: FC<IFieldProps> = ({ label, id, error, onChange }) => {
  return (
    <div className={classes.field}>
      <label htmlFor={id}>{label}</label>
      <Input id={id} onChange={onChange} />
      {error ? <div className={classes.error}>{error}</div> : null}
    </div>
  );
};

export { Field };
