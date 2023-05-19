import {
  CSSProperties,
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import MainView from "../components/main-view/MainView";
import Button from "../components/button/Button";
import httpClient from "../services/http-client";
import { MuscleExercise } from "../interfaces/muscle-exercise";
import Loading from "../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import CreateWorkoutContext from "../stores/create-workout-context";
import ExerciseModal from "../components/exerciseModal/ExerciseModal";

const CreateWorkoutPage: FC = () => {
  const [muscleExercises, setMuscleExercises] = useState<MuscleExercise[]>();
  const [newWorkoutExerciseIds, setNewWorkoutExerciseIds] = useState<string[]>(
    []
  );
  const [workoutName, setWorkoutName] = useState<string>();
  const [avPerformanceTime, setAvPerformanceTime] = useState<number>();
  const navigate = useNavigate();
  const context = useContext(CreateWorkoutContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!context.trainingBlockId || !context.blockName) {
      navigate("/programs");
    }

    loadMuscleExercises();
  }, []);

  const loadMuscleExercises = async () => {
    try {
      const response = await httpClient().get<MuscleExercise[]>(
        `/v1/ExerciseMuscles`
      );

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
      await httpClient().post("/v1/Workouts", {
        workoutName: workoutName,
        avPerformanceTime: avPerformanceTime,
        trainingBlockId: context.trainingBlockId,
        exerciseIds: [...new Set(newWorkoutExerciseIds)],
      });

      navigate(`/training-block/details/${context.trainingBlockId}`);
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
      <MainView title={`Add workout with exercises to ${context.blockName}`}>
        <form style={formStyle} onSubmit={onSubmit}>
          <label htmlFor="workoutName" className="main-label">
            Workout name
          </label>
          <input
            type="text"
            name="workoutName"
            onChange={(event) => {
              setWorkoutName(event.target.value);
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
          <Button
            onClick={() => {
              setIsModalVisible((isVisible) => !isVisible);
            }}
            text={"Add new exercise"}
            type={"outlined"}
          ></Button>
          <Button
            text={"Create"}
            onClick={() => {
              console.log("create workout");
            }}
            type={"secondary"}
            btnType="submit"
          ></Button>
        </form>
        {isModalVisible && (
          <ExerciseModal
            onCancel={() => setIsModalVisible((isVisible) => !isVisible)}
            onSuccess={loadMuscleExercises}
          ></ExerciseModal>
        )}
      </MainView>
    </>
  );
};

export default CreateWorkoutPage;
