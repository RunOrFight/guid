import { Modal } from "../Modal/Modal.tsx";
import { IModalContext } from "../Modal/ModalContext.tsx";
import { PlusIcon } from "lucide-react";
import { useTreeContext } from "./TreeContext.tsx";
import { FC, useState } from "react";
import { ITreeItem } from "./ITreeItem.tsx";
import { withStopPropagation } from "../../Utils/WithStopPropagation.ts";
import classes from "./Tree.module.css";
import { Button } from "../Button/Button.tsx";
import { Field } from "../Field/Field.tsx";
import { useAsync } from "../../Utils/UseAsync.ts";
import { withPreventDefault } from "../../Utils/WithPreventDefault.ts";

type TCreateTreeNodeFormProps = Pick<IModalContext, "closeModal"> &
  Pick<ITreeItem, "id">;

const CreateTreeNodeForm = ({ closeModal, id }: TCreateTreeNodeFormProps) => {
  const { createNode, refreshTree } = useTreeContext();
  const { trigger, error, loading } = useAsync(createNode);

  const [inputValue, setInputValue] = useState("");

  const onSubmit = withPreventDefault(() => {
    trigger(id, inputValue).then(() => {
      refreshTree();
      closeModal();
    });
  });

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <Field
        error={error}
        id={"name"}
        label={"Name"}
        onChange={setInputValue}
      />
      <div className={classes.formBottom}>
        <Button type={"submit"} disabled={loading}>
          {"Create"}
        </Button>
      </div>
    </form>
  );
};

const renderTrigger = ({ openModal }: IModalContext) => (
  <PlusIcon size={"14"} onClick={withStopPropagation(openModal)} />
);

const CreateTreeNode: FC<Pick<ITreeItem, "id">> = ({ id }) => {
  return (
    <Modal renderTrigger={renderTrigger}>
      {({ closeModal }: IModalContext) => (
        <CreateTreeNodeForm closeModal={closeModal} id={id} />
      )}
    </Modal>
  );
};

export { CreateTreeNode };
