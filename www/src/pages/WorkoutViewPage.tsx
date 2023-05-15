import { FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { useParams } from "react-router-dom";
import { Workout } from "../interfaces/workout";
import Loading from "../components/loading/Loading";

const WorkoutViewPage: FC = () => {
  const [workout, setWorkout] = useState<Workout>();
  const { workoutId } = useParams();

  useEffect(() => {
    loadWorkoutExercises();
  }, []);

  const loadWorkoutExercises = async () => {
    try {
      const response = await httpClient.get<Workout>(
        `/v1/WorkoutExercises/${workoutId}`
      );

      setWorkout(response.data);
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
              <div>{item.exerciseName}</div>
            ))}
          </>
        ) : (
          <Loading />
        )}
      </MainView>
    </>
  );
};

export default WorkoutViewPage;
