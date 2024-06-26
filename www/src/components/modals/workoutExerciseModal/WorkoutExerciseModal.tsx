import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { MuscleExercise } from "../../../interfaces/domain-properties/muscle-exercise";
import Loading from "../../loading/Loading";
import Button from "../../button/Button";
import Modal from "../modal/Modal";
import { WorkoutExerciseModalProperties } from "../../../interfaces/modal-properties/workout-exercise-modal-properties";
import ExerciseModal from "../exerciseModal/ExerciseModal";
import { createWorkoutExercise } from "../../../services/workout.service";
import { getExerciseMuscles } from "../../../services/training.service";

const WorkoutExerciseModal: FC<WorkoutExerciseModalProperties> = (props) => {
  const [newWorkoutExerciseIds, setNewWorkoutExerciseIds] = useState<string[]>(
    []
  );
  const [muscleExercises, setMuscleExercises] = useState<MuscleExercise[]>();
  // modal visbility
  const [isExerciseModalVisible, setIsExerciseModalVisible] = useState(false);

  useEffect(() => {
    loadMuscleExercises();
  }, []);

  const loadMuscleExercises = async () => {
    try {
      const response = await getExerciseMuscles();

      setMuscleExercises(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setNewWorkoutExerciseIds((prevCheckboxes) => [...prevCheckboxes, value]);
    } else {
      setNewWorkoutExerciseIds((prevCheckboxes) =>
        prevCheckboxes.filter(
          (item, index) =>
            item !== value || index !== newWorkoutExerciseIds.indexOf(value)
        )
      );
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createWorkoutExercise(props.workoutId, newWorkoutExerciseIds);

      await props.onSuccess();
      props.onCancel();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isExerciseModalVisible ? (
        <></>
      ) : (
        <Modal onCancel={props.onCancel}>
          <form onSubmit={onSubmit}>
            <h1 className="modal-title">Select exercises</h1>
            {muscleExercises ? (
              <>
                {muscleExercises.map((item) => (
                  <div key={item.id}>
                    <h3 style={{ color: "#01010180", fontWeight: "bold" }}>
                      {item.muscleGroupName}
                    </h3>
                    {item.exercises.map((exercise) => {
                      return (
                        <div className="checkbox-row" key={exercise.id}>
                          <input
                            type="checkbox"
                            name={exercise.exerciseName}
                            value={exercise.id}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            htmlFor={exercise.exerciseName}
                            style={{ color: "#01010180" }}
                          >
                            {exercise.exerciseName}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </>
            ) : (
              <Loading />
            )}
            <Button
              onClick={() => {
                setIsExerciseModalVisible((isVisible) => !isVisible);
              }}
              text={"Add new exercise"}
              type={"secondary"}
              style={{ marginBottom: "25px" }}
            ></Button>
            <Button
              onClick={() => {}}
              text={"Add"}
              type={"primary"}
              style={{ margin: "0 auto" }}
              btnType="submit"
            ></Button>
          </form>
        </Modal>
      )}

      {isExerciseModalVisible && (
        <ExerciseModal
          onCancel={() => setIsExerciseModalVisible((isVisible) => !isVisible)}
          onSuccess={loadMuscleExercises}
        ></ExerciseModal>
      )}
    </>
  );
};

export default WorkoutExerciseModal;
