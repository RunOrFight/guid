import { Modal } from "../Modal/Modal.tsx";
import { IModalContext } from "../Modal/ModalContext.tsx";
import { PlusIcon } from "lucide-react";
import { useTreeContext } from "./TreeContext.tsx";
import { FC, useState } from "react";
import { ITreeItem } from "./ITreeItem.tsx";
import { withStopPropagation } from "../../Utils/WithStopPropagation.ts";

type TCreateTreeNodeFormProps = Pick<IModalContext, "closeModal"> &
  Pick<ITreeItem, "id">;

const CreateTreeNodeForm = ({ closeModal, id }: TCreateTreeNodeFormProps) => {
  const { createNode, getRootNode } = useTreeContext();

  const [inputValue, setInputValue] = useState("");

  const onSubmit = (e) => {
    createNode(id, inputValue).then(getRootNode).then(closeModal);
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor={"name"}>{"Name"}</label>
      <input
        name={"name"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type={"submit"}>{"Submit"}</button>
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
