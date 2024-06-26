import {
  CSSProperties,
  ChangeEvent,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MainView from "../components/main-view/MainView";
import Button from "../components/button/Button";
import { MuscleExercise } from "../interfaces/domain-properties/muscle-exercise";
import Loading from "../components/loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import CreateWorkoutContext from "../stores/create-workout-context";
import ExerciseModal from "../components/modals/exerciseModal/ExerciseModal";
import ConfirmationModal from "../components/modals/confirmationModal/ConfirmationModal";
import { createWorkout } from "../services/workout.service";
import { getExerciseMuscles } from "../services/training.service";

const CreateWorkoutPage: FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const context = useContext(CreateWorkoutContext);
  const [muscleExercises, setMuscleExercises] = useState<MuscleExercise[]>();
  const [newWorkoutExerciseIds, setNewWorkoutExerciseIds] = useState<string[]>(
    []
  );
  const [workoutName, setWorkoutName] = useState<string>();
  const [avPerformanceTime, setAvPerformanceTime] = useState<number>();
  // modal visibility
  const [isExerciseModalVisible, setIsExerciseModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  // validation
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const containsOnlySpacesOrTabs = (inputString: string) => {
    const pattern: RegExp = /^[ \t]+$/;
    return pattern.test(inputString);
  };

  const isWorkoutNameInvalid =
    !workoutName ||
    workoutName.length === 0 ||
    containsOnlySpacesOrTabs(workoutName);

  const isNewWorkoutExerciseIdsInvalid = newWorkoutExerciseIds.length === 0;

  useEffect(() => {
    if (!context.trainingBlockId || !context.blockName) {
      return;
    }

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

  const saveWorkout = async () => {
    await createWorkout(
      workoutName!,
      avPerformanceTime!,
      context.trainingBlockId!,
      newWorkoutExerciseIds
    );
  };

  const handleConfirmationYes = async () => {
    try {
      await saveWorkout();

      if (formRef.current) {
        formRef.current.reset();
      }

      setNewWorkoutExerciseIds([]);
      setIsConfirmationModalVisible(false);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  const handleConfirmationNo = async () => {
    try {
      await saveWorkout();
      navigate(`/training-block/details/${context.trainingBlockId}`);
      setNewWorkoutExerciseIds([]);
      setIsConfirmationModalVisible(false);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  const formStyle: CSSProperties = {
    maxWidth: "500px",
    margin: "0 auto",
    width: "100%",
  };

  if (!context.blockName || !context.trainingBlockId) {
    return (
      <>
        <MainView title="Oops, something went wrong :(">
          <Link to={"/programs"}>
            <Button
              text={"Back to programs"}
              onClick={() => {}}
              type={"outlined"}
            ></Button>
          </Link>
        </MainView>
      </>
    );
  }

  return (
    <>
      <MainView title={`Create workout with exercises to ${context.blockName}`}>
        <form style={formStyle} ref={formRef}>
          <label htmlFor="workoutName" className="main-label">
            Workout name *
          </label>
          {isFormInvalid && isWorkoutNameInvalid && (
            <p className="invalid-message">* Please add a workout name</p>
          )}
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
          <label className="main-label">Select exercises *</label>
          {isFormInvalid && isNewWorkoutExerciseIdsInvalid && (
            <p className="invalid-message">
              * Please choose at least one exercise!
            </p>
          )}
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
            style={{
              display: "flex",
              gap: "30px",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Button
              text={"Create"}
              onClick={() => {
                if (isWorkoutNameInvalid || isNewWorkoutExerciseIdsInvalid) {
                  if (!isFormInvalid) setIsFormInvalid((value) => !value);
                  return;
                }
                setIsConfirmationModalVisible(true);
              }}
              type={"secondary"}
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
        {isConfirmationModalVisible && (
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
