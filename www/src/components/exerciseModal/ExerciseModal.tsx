import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import "./ExerciseModal.scss";
import Modal from "../modal/Modal";
import Button from "../button/Button";
import { MuscleGroup } from "../../interfaces/muscle-group";
import httpClient from "../../services/http-client";
import Loading from "../loading/Loading";
import { ExerciseModalProperties } from "../../interfaces/exercise-modal-properties";

const ExerciseModal: FC<ExerciseModalProperties> = (props) => {
  const [muscles, setMuscles] = useState<MuscleGroup[]>([]);
  const [exerciseName, setExerciseName] = useState<string>();
  const [exerciseDescription, setExerciseDescription] = useState<string>();
  const [muscleGroupIds, setMuscleGroupIds] = useState<string[]>([]);

  useEffect(() => {
    loadMuscleGroups();
  }, []);

  const loadMuscleGroups = async () => {
    try {
      const response = await httpClient().get<MuscleGroup[]>(
        `/v1/MuscleGroups`
      );

      setMuscles(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await httpClient().post("/v1/Exercises", {
        exerciseName: exerciseName,
        exerciseDescription: exerciseDescription,
        muscleGroupIds: muscleGroupIds,
      });

      await props.onSuccess();
      props.onCancel();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setMuscleGroupIds((prevCheckboxes) => [...prevCheckboxes, value]);
    } else {
      setMuscleGroupIds((prevCheckboxes) =>
        prevCheckboxes.filter((item) => item !== value)
      );
    }
  };

  return (
    <Modal onCancel={props.onCancel}>
      {muscles.length !== 0 ? (
        <>
          <h1 className="modal-title">Create new exercise</h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="exerciseName" className="modal-label">
              Exercise name
            </label>
            <input
              type="text"
              name="exerciseName"
              className="modal-input"
              onChange={(event) => {
                setExerciseName(event.target.value);
              }}
            />
            <label htmlFor="exerciseDescription" className="modal-label">
              Exercise description
            </label>
            <textarea
              name="exerciseDescription"
              className="modal-input"
              style={{
                border: "none",
                boxSizing: "border-box",
                height: "50px",
                marginBottom: "10px",
                padding: "10px",
                width: "100%",
              }}
              onChange={(event) => {
                setExerciseDescription(event.target.value);
              }}
            ></textarea>
            <label htmlFor="" className="modal-label">
              Select main working muscle(s)
            </label>

            {muscles.map((item) => (
              <div className="modal-checkbox-row" key={item.id}>
                <input
                  type="checkbox"
                  name={item.muscleName}
                  value={item.id}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={item.muscleName} className="modal-label">
                  {item.muscleName}
                </label>
              </div>
            ))}

            <Button
              onClick={() => {}}
              text={"Create"}
              type={"primary"}
              btnType="submit"
              style={{ margin: "0 auto" }}
            ></Button>
          </form>
        </>
      ) : (
        <Loading />
      )}
    </Modal>
  );
};

export default ExerciseModal;
