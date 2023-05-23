import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import "./ExerciseModal.scss";
import Modal from "../modal/Modal";
import Button from "../../button/Button";
import { MuscleGroup } from "../../../interfaces/muscle-group";
import httpClient from "../../../services/http-client";
import Loading from "../../loading/Loading";
import { ExerciseModalProperties } from "../../../interfaces/exercise-modal-properties";

const ExerciseModal: FC<ExerciseModalProperties> = (props) => {
  const [muscles, setMuscles] = useState<MuscleGroup[]>([]);
  const [exerciseName, setExerciseName] = useState<string>();
  const [exerciseDescription, setExerciseDescription] = useState<string>();
  const [muscleGroupIds, setMuscleGroupIds] = useState<string[]>([]);
  const [isFormInvalid, setIsFormInvalid] = useState(false);

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

  const containsOnlySpacesOrTabs = (inputString: string) => {
    const pattern: RegExp = /^[ \t]+$/;
    return pattern.test(inputString);
  };

  const isExerciseNameInvalid =
    !exerciseName ||
    exerciseName.length === 0 ||
    containsOnlySpacesOrTabs(exerciseName);

  const isMuscleGroupsInvalid = muscleGroupIds.length === 0;

  return (
    <Modal onCancel={props.onCancel}>
      {muscles.length !== 0 ? (
        <>
          <h1 className="modal-title">Create new exercise</h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="exerciseName" className="modal-label">
              Exercise name *
            </label>
            {isFormInvalid && isExerciseNameInvalid && (
              <p className="invalid-message" style={{ color: "red" }}>
                * Please add an exercise name
              </p>
            )}
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
              Select main working muscle(s) *
            </label>
            {isFormInvalid && isMuscleGroupsInvalid && (
              <p className="invalid-message" style={{ color: "red" }}>
                * Please choose at least one muscle group
              </p>
            )}

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
              onClick={() => {
                if (isExerciseNameInvalid) {
                  if (!isFormInvalid) setIsFormInvalid((value) => !value);
                  return;
                }
              }}
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
