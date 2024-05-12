import { FC, FormEvent, useEffect, useState } from "react";
import "./SetModal.scss";
import Modal from "../modal/Modal";
import { SetModalProperties } from "../../../interfaces/modal-properties/set-modal-properties";
import Button from "../../button/Button";
import {
  createWorkoutSet,
  updateWorkoutSetById,
} from "../../../services/workout.service";

const SetModal: FC<SetModalProperties> = (props) => {
  const [repCount, setRepCount] = useState<number>();
  const [weight, setWeight] = useState<number>();

  useEffect(() => {
    setRepCount(props.existingWorkoutSet?.repAmount);
    setWeight(props.existingWorkoutSet?.usedWeight);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (props.title === "Add a new set") {
        await createWorkoutSet(props.exerciseId, weight!, repCount!);
      } else {
        await updateWorkoutSetById(
          props.existingWorkoutSet!.id,
          weight!,
          repCount!
        );
      }

      await props.onSuccess();
      props.onCancel();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal onCancel={props.onCancel}>
      <h1 className="set-modal-title">{props.exerciseName},</h1>
      <h1 className="set-modal-title">{props.title}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="repetitionCount" className="set-modal-label">
          Repetition count
        </label>
        <input
          type="number"
          defaultValue={repCount}
          name="repetitionCount"
          className="set-modal-input"
          onChange={(event) => setRepCount(+event.target.value)}
        />
        <label htmlFor="weight" className="set-modal-label">
          Weight (kg)
        </label>
        <input
          type="number"
          defaultValue={weight}
          step=".01"
          name="weight"
          className="set-modal-input"
          onChange={(event) => setWeight(+event.target.value)}
        />
        <Button
          onClick={() => {}}
          text={props.title === "Add a new set" ? "Add" : "Edit"}
          type={"primary"}
          btnType="submit"
          style={{ margin: "0 auto" }}
        ></Button>
      </form>
      {props.children}
    </Modal>
  );
};

export default SetModal;
