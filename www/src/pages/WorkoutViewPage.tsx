import { FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { useNavigate, useParams } from "react-router-dom";
import { Workout } from "../interfaces/workout";
import Loading from "../components/loading/Loading";
import SetModal from "../components/setModal/SetModal";
import OverviewRow from "../components/overview-row/OverviewRow";
import Button from "../components/button/Button";
import ConfirmationModal from "../components/confirmationModal/ConfirmationModal";

const WorkoutViewPage: FC = () => {
  const [workout, setWorkout] = useState<Workout>();
  const { workoutId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExerciseName, setSelectedExerciseName] = useState<string>();
  const [selectedWorkoutExerciseId, setSelectedWorkoutExerciseId] =
    useState<string>();
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const navigate = useNavigate();

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
                  setIsModalVisible((isVisible) => !isVisible);
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
                      <li key={index}>
                        {set.repNumber} x {set.usedWeight}
                      </li>
                    );
                  })}
                </ul>
              </OverviewRow>
            ))}
            <Button
              text={"Delete workout"}
              onClick={() => setIsConfirmationModalVisible(true)}
              type={"outlined"}
              style={{ marginTop: "40px" }}
            ></Button>
          </>
        ) : (
          <Loading />
        )}
        {isModalVisible && (
          <SetModal
            onCancel={() => setIsModalVisible((isVisible) => !isVisible)}
            onSuccess={loadWorkoutExercises}
            exerciseId={selectedWorkoutExerciseId!}
            exerciseName={selectedExerciseName!}
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
      </MainView>
    </>
  );
};

export default WorkoutViewPage;
