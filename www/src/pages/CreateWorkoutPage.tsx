import {
  CSSProperties,
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useRef,
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
import ConfirmationModal from "../components/confirmationModal/ConfirmationModal";

const CreateWorkoutPage: FC = () => {
  const [muscleExercises, setMuscleExercises] = useState<MuscleExercise[]>();
  const [newWorkoutExerciseIds, setNewWorkoutExerciseIds] = useState<string[]>(
    []
  );
  const [workoutName, setWorkoutName] = useState<string>();
  const [avPerformanceTime, setAvPerformanceTime] = useState<number>();
  const navigate = useNavigate();
  const context = useContext(CreateWorkoutContext);
  const [isExerciseModalVisible, setIsExerciseModalVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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

      setShowConfirmation(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleConfirmationYes = () => {
    if (formRef.current) {
      formRef.current.reset();
    }

    setShowConfirmation(false);
  };

  const handleConfirmationNo = () => {
    navigate(`/training-block/details/${context.trainingBlockId}`);

    setShowConfirmation(false);
  };

  const formStyle: CSSProperties = {
    maxWidth: "500px",
    margin: "0 auto",
    width: "100%",
  };

  return (
    <>
      <MainView title={`Create workout with exercises to ${context.blockName}`}>
        <form style={formStyle} onSubmit={onSubmit} ref={formRef}>
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
            Average performance time in minutes
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
              setIsExerciseModalVisible((isVisible) => !isVisible);
            }}
            text={"Add new exercise"}
            type={"outlined"}
            style={{ marginBottom: "50px" }}
          ></Button>
          <div
            style={{ display: "flex", gap: "30px", justifyContent: "center" }}
          >
            <Button
              text={"Create"}
              onClick={() => {
                setIsConfirmationModalVisible(true);
              }}
              type={"secondary"}
              btnType="submit"
            ></Button>
            <Button
              text={"Back"}
              onClick={() => {
                navigate(-1);
              }}
              type={"outlined"}
            ></Button>
          </div>
        </form>
        {isExerciseModalVisible && (
          <ExerciseModal
            onCancel={() =>
              setIsExerciseModalVisible((isVisible) => !isVisible)
            }
            onSuccess={loadMuscleExercises}
          ></ExerciseModal>
        )}
        {showConfirmation && isConfirmationModalVisible && (
          <ConfirmationModal
            onCancel={() =>
              setIsConfirmationModalVisible((isVisible) => !isVisible)
            }
            onYesClick={handleConfirmationYes}
            onNoClick={handleConfirmationNo}
            title={"Do you want to create another workout?"}
          ></ConfirmationModal>
        )}
      </MainView>
    </>
  );
};

export default CreateWorkoutPage;
