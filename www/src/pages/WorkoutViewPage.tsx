import { FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { useParams } from "react-router-dom";
import { Workout } from "../interfaces/workout";
import Loading from "../components/loading/Loading";
import SetModal from "../components/setModal/SetModal";
import OverviewRow from "../components/overview-row/OverviewRow";

const WorkoutViewPage: FC = () => {
  const [workout, setWorkout] = useState<Workout>();
  const { workoutId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExerciseName, setSelectedExerciseName] = useState<string>();
  const [selectedWorkoutExerciseId, setSelectedWorkoutExerciseId] =
    useState<string>();

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

  return (
    <>
      <MainView title={workout?.workoutName ?? ""}>
        {workout ? (
          <>
            {workout.exercises.map((item) => (
              <OverviewRow
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
                <ul style={{ marginLeft: "20px", marginTop: "20px" }}>
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
      </MainView>
    </>
  );
};

export default WorkoutViewPage;
