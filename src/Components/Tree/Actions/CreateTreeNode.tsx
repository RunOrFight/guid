import { Modal } from "../../Modal/Modal.tsx";
import { IModalContext } from "../../Modal/ModalContext.tsx";
import { PlusIcon } from "lucide-react";
import { useTreeContext } from "../TreeContext.tsx";
import { FC, useState } from "react";
import { ITreeItem } from "../ITreeItem.tsx";
import { withStopPropagation } from "../../../Utils/WithStopPropagation.ts";
import { Button } from "../../Button/Button.tsx";
import { Field } from "../../Field/Field.tsx";
import { useAsync } from "../../../Utils/UseAsync.ts";
import { Form } from "../../Form/Form.tsx";

type TCreateTreeNodeFormProps = Pick<IModalContext, "closeModal"> &
  Pick<ITreeItem, "id">;

const CreateTreeNodeForm = ({ closeModal, id }: TCreateTreeNodeFormProps) => {
  const { createNode, refreshTree } = useTreeContext();
  const { trigger, error, loading } = useAsync(createNode);

  const [inputValue, setInputValue] = useState("");

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
        <Button type={"submit"} loading={loading} value={"Create Node"} />
      }
    >
      <Field
        error={error}
        id={"name"}
        label={"Node Name"}
        onChange={setInputValue}
      />
    </Form>
  );
};

const renderTrigger = ({ openModal }: IModalContext) => (
  <PlusIcon size={"1rem"} onClick={withStopPropagation(openModal)} />
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
