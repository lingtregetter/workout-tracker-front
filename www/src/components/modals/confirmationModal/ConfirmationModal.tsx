import { FC } from "react";
import "./ConfirmationModal.scss";
import Modal from "../modal/Modal";
import Button from "../../button/Button";
import { ConfirmationModalProperties } from "../../../interfaces/modal-properties/confirmation-modal-properties";

const ConfirmationModal: FC<ConfirmationModalProperties> = (props) => {
  return (
    <Modal onCancel={props.onCancel}>
      <h2>{props.title}</h2>
      <h5>{props.children}</h5>
      <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
        <Button
          onClick={props.onYesClick}
          text={"Yes"}
          type={"primary"}
        ></Button>
        <Button
          onClick={props.onNoClick}
          text={"No"}
          type={"secondary"}
        ></Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
