import { Modal } from "../../Modal/Modal.tsx";
import { IModalContext } from "../../Modal/ModalContext.tsx";
import { TrashIcon } from "lucide-react";
import { useTreeContext } from "../TreeContext.tsx";
import { FC } from "react";
import { ITreeItem } from "../ITreeItem.tsx";
import { withStopPropagation } from "../../../Utils/WithStopPropagation.ts";
import { useAsync } from "../../../Utils/UseAsync.ts";
import { Button } from "../../Button/Button.tsx";
import classes from "../Tree.module.css";
import { Form } from "../../Form/Form.tsx";
import { Error } from "../../Error/Error.tsx";

type TDeleteTreeNodeFormProps = Pick<IModalContext, "closeModal"> &
  Pick<ITreeItem, "id" | "name">;

const DeleteTreeNodeForm = ({
  closeModal,
  id,
  name,
}: TDeleteTreeNodeFormProps) => {
  const { deleteNode, refreshTree } = useTreeContext();
  const { loading, error, trigger } = useAsync(deleteNode);

  const onSubmit = () => {
    trigger(id).then(() => {
      refreshTree();
      closeModal();
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      bottom={
        <Button
          type={"submit"}
          danger
          className={classes.danger}
          loading={loading}
          value={"Delete"}
        />
      }
    >
      <div>{`Do you want to delete ${name}?`}</div>
      {error ? <Error>{error}</Error> : null}
    </Form>
  );
};

const renderTrigger = ({ openModal }: IModalContext) => (
  <TrashIcon size={"1rem"} onClick={withStopPropagation(openModal)} />
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
