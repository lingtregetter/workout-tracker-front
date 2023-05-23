import { FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { useNavigate, useParams } from "react-router-dom";
import { Workout } from "../interfaces/workout";
import Loading from "../components/loading/Loading";
import SetModal from "../components/modals/setModal/SetModal";
import OverviewRow from "../components/overview-row/OverviewRow";
import Button from "../components/button/Button";
import ConfirmationModal from "../components/modals/confirmationModal/ConfirmationModal";
import WorkoutExerciseModal from "../components/modals/workoutExerciseModal/WorkoutExerciseModal";
import DeleteButton from "../components/svg-buttons/DeleteButton";

const WorkoutViewPage: FC = () => {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState<Workout>();
  const [selectedExerciseName, setSelectedExerciseName] = useState<string>();
  const [selectedWorkoutExerciseId, setSelectedWorkoutExerciseId] =
    useState<string>();
  const [selectedSet, setSelectedSet] = useState<{
    id: string;
    repAmount: number;
    usedWeight: number;
  }>();
  const [workoutExerciseToBeDeleted, setWorkoutExerciseToBeDeleted] =
    useState<String>();
  const [workoutExerciseNameToBeDeleted, setWorkoutExerciseNameToBeDeleted] =
    useState<String>();
  // modal visibility
  const [isSetModalVisible, setIsSetModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isEditSetModalVisible, setIsEditSetModalVisible] = useState(false);
  const [isWorkoutExerciseModalVisible, setIsWorkoutExerciseModalVisible] =
    useState(false);
  const [
    isWorkoutExerciseConfirmationModalVisible,
    setIsWorkoutExerciseConfirmationModalVisible,
  ] = useState(false);

  useEffect(() => {
    loadWorkoutExercises();
  }, []);

  const loadWorkoutExercises = async () => {
    try {
      const response = await httpClient().get<Workout>(
        `/v1/WorkoutExercises/${workoutId}`
      );

      for (const exercise of response.data.exercises) {
        const sets = await loadWorkoutSets(exercise.workoutExerciseId);
        exercise.sets = sets;
      }
      setWorkout(response.data);
    } catch (e) {
      console.log(e);

      navigate("/programs");
    }
  };

  const loadWorkoutSets = async (workoutExerciseId: string) => {
    try {
      const response = await httpClient().get<any>(
        `/v1/WorkoutSets/${workoutExerciseId}`
      );

      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const onYesClick = async () => {
    try {
      await httpClient().delete(`/v1/Workouts/${workoutId}`);

      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  };

  const onNoClick = () => {
    setIsConfirmationModalVisible(false);
    setIsWorkoutExerciseConfirmationModalVisible(false);
  };

  const onSetDelete = async () => {
    try {
      await httpClient().delete(`/v1/WorkoutSets/${selectedSet?.id}`);

      loadWorkoutExercises();
      setIsEditSetModalVisible(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onWorkoutExerciseDelete = async () => {
    try {
      await httpClient().delete(
        `/v1/WorkoutExercises/${workoutExerciseToBeDeleted}`
      );

      loadWorkoutExercises();
      setIsWorkoutExerciseConfirmationModalVisible(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MainView title={workout?.workoutName ?? ""}>
        {workout ? (
          <>
            {workout.exercises.map((item) => (
              <OverviewRow
                hoverTitle="Add workout set"
                title={item.exerciseName}
                key={item.id}
                isArrowBtnVisible={false}
                onArrowClick={() => {}}
                onAddClick={() => {
                  setSelectedWorkoutExerciseId(item.workoutExerciseId);
                  setSelectedExerciseName(item.exerciseName);
                  setIsSetModalVisible((isVisible) => !isVisible);
                }}
              >
                <div style={{ marginTop: "5px" }}>
                  {item.exerciseDescription}
                </div>
                <ul
                  style={{
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                >
                  {item.sets?.map((set, index) => {
                    return (
                      <li
                        key={index}
                        style={{ cursor: "pointer", marginBottom: "2.5px" }}
                        title="Edit set"
                        onClick={() => {
                          setSelectedExerciseName(item.exerciseName);
                          setIsEditSetModalVisible(true);
                          setSelectedSet({
                            id: set.id,
                            repAmount: set.repNumber,
                            usedWeight: set.usedWeight,
                          });
                        }}
                      >
                        {set.repNumber} x {set.usedWeight}
                      </li>
                    );
                  })}
                </ul>

                <div
                  title="Delete exercise"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                  }}
                >
                  <DeleteButton
                    onClick={() => {
                      setIsWorkoutExerciseConfirmationModalVisible(true);
                      setWorkoutExerciseToBeDeleted(item.workoutExerciseId);
                      setWorkoutExerciseNameToBeDeleted(item.exerciseName);
                    }}
                    fill="red"
                  ></DeleteButton>
                </div>
              </OverviewRow>
            ))}
            <div style={{ display: "flex", gap: "30px" }}>
              <Button
                text={"Add exercise"}
                onClick={() => setIsWorkoutExerciseModalVisible(true)}
                type={"outlined"}
                style={{ marginTop: "40px" }}
              ></Button>
              <Button
                text={"Delete workout"}
                onClick={() => setIsConfirmationModalVisible(true)}
                type={"outlined"}
                style={{ marginTop: "40px" }}
              ></Button>
            </div>
          </>
        ) : (
          <Loading />
        )}
        {isSetModalVisible && (
          <SetModal
            onCancel={() => setIsSetModalVisible((isVisible) => !isVisible)}
            onSuccess={loadWorkoutExercises}
            exerciseId={selectedWorkoutExerciseId!}
            exerciseName={selectedExerciseName!}
            title={"Add a new set"}
          ></SetModal>
        )}
        {isConfirmationModalVisible && (
          <ConfirmationModal
            onCancel={() =>
              setIsConfirmationModalVisible((isVisible) => !isVisible)
            }
            onYesClick={onYesClick}
            onNoClick={onNoClick}
            title={`Are you sure you want to delete workout - ${
              workout!.workoutName
            }?`}
            children={
              "You cannot undo this move and all your data about this workout will be lost!"
            }
          ></ConfirmationModal>
        )}
        {isEditSetModalVisible && (
          <SetModal
            onCancel={() => setIsEditSetModalVisible((isVisible) => !isVisible)}
            onSuccess={loadWorkoutExercises}
            exerciseId={selectedWorkoutExerciseId!}
            exerciseName={selectedExerciseName!}
            title={"Edit set"}
            existingWorkoutSet={selectedSet}
          >
            <div title="Delete set forever" style={{ cursor: "pointer" }}>
              <DeleteButton
                onClick={() => {
                  onSetDelete();
                }}
                style={{
                  display: "block",
                  margin: "0 auto",
                  marginTop: "10px",
                }}
                fill="#185a97"
              ></DeleteButton>
            </div>
          </SetModal>
        )}
        {isWorkoutExerciseModalVisible && (
          <WorkoutExerciseModal
            onCancel={() =>
              setIsWorkoutExerciseModalVisible((isVisible) => !isVisible)
            }
            onSuccess={loadWorkoutExercises}
            workoutId={workoutId!}
          ></WorkoutExerciseModal>
        )}
        {isWorkoutExerciseConfirmationModalVisible && (
          <ConfirmationModal
            onCancel={() =>
              setIsWorkoutExerciseConfirmationModalVisible(
                (isVisible) => !isVisible
              )
            }
            onYesClick={onWorkoutExerciseDelete}
            onNoClick={onNoClick}
            title={`Are you sure you want to delete workout exercise - ${workoutExerciseNameToBeDeleted}?`}
            children={
              "You cannot undo this move and all your data about this workout exercise will be lost!"
            }
          ></ConfirmationModal>
        )}
      </MainView>
    </>
  );
};

export default WorkoutViewPage;
