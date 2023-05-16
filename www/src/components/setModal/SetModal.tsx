import { FC, FormEvent, useState } from "react";
import "./SetModal.scss";
import Modal from "../modal/Modal";
import { SetModalProperties } from "../../interfaces/set-modal-properties";
import Button from "../button/Button";
import httpClient from "../../services/http-client";

const SetModal: FC<SetModalProperties> = (props) => {
  const [repCount, setRepCount] = useState<number>();
  const [weight, setWeight] = useState<number>();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await httpClient().post("/v1/WorkoutSets", {
        workoutExerciseId: "2d16a805-4000-4b4d-9fe9-df919568b4c6",
        usedWeight: weight,
        repNumber: repCount,
      });

      await props.onSuccess();
      props.onCancel();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal onCancel={props.onCancel}>
      <h1 className="set-modal-title">TODO: Exercise name,</h1>
      <h1 className="set-modal-title">Add a new repetition</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="repetitionCount" className="set-modal-label">
          Repetition count
        </label>
        <input
          type="number"
          name="repetitionCount"
          className="set-modal-input"
          onChange={(event) => setRepCount(+event.target.value)}
        />
        <label htmlFor="weight" className="set-modal-label">
          Weight (kg)
        </label>
        <input
          type="number"
          step=".01"
          name="weight"
          className="set-modal-input"
          onChange={(event) => setWeight(+event.target.value)}
        />
        <Button
          onClick={() => {
            console.log("create exercise");
          }}
          text={"Add"}
          type={"primary"}
          btnType="submit"
        ></Button>
      </form>
    </Modal>
  );
};

export default SetModal;
