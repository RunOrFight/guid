import { FC, FormHTMLAttributes, ReactNode } from "react";
import classes from "./Form.module.css";
import clsx from "clsx";
import { withPreventDefault } from "../../Utils/WithPreventDefault.ts";

interface IFormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  bottom?: ReactNode;
  onSubmit?: () => void;
}

const Form: FC<IFormProps> = ({
  children,
  className,
  bottom,
  onSubmit,
  ...rest
}) => {
  return (
    <form
      className={clsx(classes.form, className)}
      onSubmit={onSubmit ? withPreventDefault(onSubmit) : undefined}
      {...rest}
    >
      {children}

      {bottom ? <div className={classes.formBottom}>{bottom}</div> : null}
    </form>
  );
};

export { Form };
