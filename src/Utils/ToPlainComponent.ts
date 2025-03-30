import { ComponentType, createElement } from "react";

const toPlainComponent =
  <Props extends object>(component: ComponentType<Props>, props: Props) =>
  () =>
    createElement(component, props);

export { toPlainComponent };
