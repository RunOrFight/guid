import { Modal } from "../Modal/Modal.tsx";
import { IModalContext } from "../Modal/ModalContext.tsx";
import { PencilIcon } from "lucide-react";
import { useTreeContext } from "./TreeContext.tsx";
import { FC, useState } from "react";
import { ITreeItem } from "./ITreeItem.tsx";
import { withStopPropagation } from "../../Utils/WithStopPropagation.ts";
import { Form } from "../Form/Form.tsx";
import { Field } from "../Field/Field.tsx";
import { Button } from "../Button/Button.tsx";
import { useAsync } from "../../Utils/UseAsync.ts";

type TRenameTreeNodeFormProps = Pick<IModalContext, "closeModal"> &
  Pick<ITreeItem, "id" | "name">;

const RenameTreeNodeForm = ({
  closeModal,
  id,
  name,
}: TRenameTreeNodeFormProps) => {
  const { renameNode, refreshTree } = useTreeContext();
  const { trigger, error, loading } = useAsync(renameNode);

  const [inputValue, setInputValue] = useState(name);

  const onSubmit = () => {
    trigger(id, inputValue).then(() => {
      refreshTree();
      closeModal();
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      bottom={
        <Button type={"submit"} value={"Update Node"} loading={loading} />
      }
    >
      <Field
        label={"New Node Name"}
        id={"newNodeName"}
        onChange={setInputValue}
        error={error}
      />
    </Form>
  );
};

const renderTrigger = ({ openModal }: IModalContext) => (
  <PencilIcon size={"14"} onClick={withStopPropagation(openModal)} />
);

const RenameTreeNode: FC<Pick<ITreeItem, "id" | "name">> = ({ id, name }) => {
  return (
    <Modal renderTrigger={renderTrigger}>
      {({ closeModal }: IModalContext) => (
        <RenameTreeNodeForm closeModal={closeModal} id={id} name={name} />
      )}
    </Modal>
  );
};

export { RenameTreeNode };
