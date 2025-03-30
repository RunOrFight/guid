import { Modal } from "../Modal/Modal.tsx";
import { IModalContext } from "../Modal/ModalContext.tsx";
import { TrashIcon } from "lucide-react";
import { useTreeContext } from "./TreeContext.tsx";
import { FC } from "react";
import { ITreeItem } from "./ITreeItem.tsx";
import { withStopPropagation } from "../../Utils/WithStopPropagation.ts";

type TDeleteTreeNodeFormProps = Pick<IModalContext, "closeModal"> &
  Pick<ITreeItem, "id">;

const DeleteTreeNodeForm = ({ closeModal, id }: TDeleteTreeNodeFormProps) => {
  const { deleteNode, getRootNode } = useTreeContext();

  const onSubmit = (e) => {
    deleteNode(id).then(getRootNode).then(closeModal);
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <button onClick={closeModal}>{"Cancel"}</button>
      <button type={"submit"}>{"Delete"}</button>
    </form>
  );
};

const renderTrigger = ({ openModal }: IModalContext) => (
  <TrashIcon size={"14"} onClick={withStopPropagation(openModal)} />
);

const DeleteTreeNode: FC<Pick<ITreeItem, "id">> = ({ id }) => {
  return (
    <Modal renderTrigger={renderTrigger}>
      {({ closeModal }: IModalContext) => (
        <DeleteTreeNodeForm closeModal={closeModal} id={id} />
      )}
    </Modal>
  );
};

export { DeleteTreeNode };
