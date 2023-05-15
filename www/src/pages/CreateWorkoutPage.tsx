import { CSSProperties, ChangeEvent, FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import Button from "../components/button/Button";
import httpClient from "../services/http-client";
import { MuscleExercise } from "../interfaces/muscle-exercise";
import Loading from "../components/loading/Loading";
import { UUID } from "crypto";
import { useNavigate } from "react-router-dom";

const CreateWorkoutPage: FC = () => {
  const [muscleExercises, setMuscleExercises] = useState<MuscleExercise[]>();
  const [newWorkoutExerciseIds, setNewWorkoutExerciseIds] = useState<UUID[]>(
    []
  );
  const [workoutName, setWorkoutName] = useState<string>();
  const [avPerformanceTime, setAvPerformanceTime] = useState<number>();
  const blockId = "15c2ce24-f228-4e3b-99b8-fa59a9f50691";
  const navigate = useNavigate();

  useEffect(() => {
    loadMuscleExercises();
  }, []);

  const loadMuscleExercises = async () => {
    try {
      const response = await httpClient.get<MuscleExercise[]>(
        `/v1/ExerciseMuscles`
      );

      console.log(response.data);

      setMuscleExercises(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setNewWorkoutExerciseIds((prevCheckboxes) => [
        ...prevCheckboxes,
        value as UUID,
      ]);
    } else {
      setNewWorkoutExerciseIds((prevCheckboxes) =>
        prevCheckboxes.filter((item) => item !== value)
      );
    }
  };

  const onSubmit = async (event: any) => {
    console.log(event);
    event.preventDefault();

    try {
      await httpClient.post("/v1/workouts", {
        workoutName: workoutName,
        avPerformanceTime: avPerformanceTime,
        trainingBlockId: blockId,
        exerciseIds: newWorkoutExerciseIds,
      });

      navigate(`/training-block/details/${blockId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const formStyle: CSSProperties = {
    maxWidth: "500px",
    margin: "0 auto",
    width: "100%",
  };

  return (
    <>
      <MainView title={"Add exercises to + dynamic ending"}>
        <form style={formStyle} onSubmit={onSubmit}>
          <label htmlFor="workoutName" className="main-label">
            Workout name
          </label>
          <input
            type="text"
            name="workoutName"
            onChange={(event) => {
              setWorkoutName(event.target.value);
              console.log(event.target.value);
            }}
          />
          <label htmlFor="avPerformanceTime" className="main-label">
            Average performance time
          </label>
          <input
            type="number"
            name="avPerformanceTime"
            onChange={(event) => {
              setAvPerformanceTime(+event.target.value);
              console.log(event.target.value);
            }}
          />
          <label className="main-label">Select exercises</label>

          {muscleExercises ? (
            <>
              {muscleExercises.map((item) => (
                <div key={item.id}>
                  <h3>{item.muscleGroupName}</h3>
                  {item.exercises.map((exercise) => {
                    return (
                      <div className="checkbox-row" key={exercise.id}>
                        <input
                          type="checkbox"
                          name={exercise.exerciseName}
                          value={exercise.id}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor={exercise.exerciseName}>
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
          <div>Create new exercise</div>

          <Button
            text={"Create"}
            onClick={() => {
              console.log("create workout");
            }}
            type={"secondary"}
            btnType="submit"
          ></Button>
        </form>
      </MainView>
    </>
  );
};

export default CreateWorkoutPage;
