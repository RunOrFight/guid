import { Modal } from "../Modal/Modal.tsx";
import { IModalContext } from "../Modal/ModalContext.tsx";
import { TrashIcon } from "lucide-react";
import { useTreeContext } from "./TreeContext.tsx";
import { FC } from "react";
import { ITreeItem } from "./ITreeItem.tsx";
import { withStopPropagation } from "../../Utils/WithStopPropagation.ts";
import { useAsync } from "../../Utils/UseAsync.ts";
import { Button } from "../Button/Button.tsx";
import classes from "./Tree.module.css";

type TDeleteTreeNodeFormProps = Pick<IModalContext, "closeModal"> &
  Pick<ITreeItem, "id" | "name">;

const DeleteTreeNodeForm = ({
  closeModal,
  id,
  name,
}: TDeleteTreeNodeFormProps) => {
  const { deleteNode, getRootNode } = useTreeContext();
  const { loading, data, error, trigger } = useAsync(deleteNode, id);

  const onSubmit = (e) => {
    trigger();
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <div>{`Do you want to delete ${name}?`}</div>
      <div className={classes.formBottom}>
        <Button
          type={"submit"}
          danger
          className={classes.danger}
          loading={loading}
        >
          {"Delete"}
        </Button>
      </div>
      {error ? <div className={classes.error}>{error}</div> : null}
    </form>
  );
};

const renderTrigger = ({ openModal }: IModalContext) => (
  <TrashIcon size={"14"} onClick={withStopPropagation(openModal)} />
);

const DeleteTreeNode: FC<Pick<ITreeItem, "id" | "name">> = ({ id, name }) => {
  return (
    <Modal renderTrigger={renderTrigger}>
      {({ closeModal }: IModalContext) => (
        <DeleteTreeNodeForm closeModal={closeModal} id={id} name={name} />
      )}
    </Modal>
  );
};

export { DeleteTreeNode };
