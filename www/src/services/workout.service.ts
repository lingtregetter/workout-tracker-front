import { Workout } from "../interfaces/domain-properties/workout";
import httpClient from "./http-client";

const workoutExerciseBasePath = "/v1/WorkoutExercises";
const workoutsBasePath = "/v1/Workouts";
const workoutSetsBasePath = "/v1/WorkoutSets";

const getWorkoutExercises = async (workoutId?: string) => {
  return await httpClient().get<Workout>(
    `${workoutExerciseBasePath}/${workoutId}`
  );
};

const createWorkoutExercise = async (
  workoutId: string,
  exerciseIds: string[]
) => {
  await httpClient().post(workoutExerciseBasePath, {
    workoutId,
    exerciseIds,
  });
};

const deleteWorkoutExercisesById = async (workoutId: string) => {
  await httpClient().delete(`${workoutExerciseBasePath}/${workoutId}`);
};

const createWorkout = async (
  workoutName: string,
  avPerformanceTime: number,
  trainingBlockId: string,
  newWorkoutExerciseIds: string[]
) => {
  await httpClient().post(workoutsBasePath, {
    workoutName: workoutName,
    avPerformanceTime: avPerformanceTime,
    trainingBlockId: trainingBlockId,
    exerciseIds: [...new Set(newWorkoutExerciseIds)],
  });
};

const deleteWorkoutById = async (workoutId?: string) => {
  await httpClient().delete(`${workoutsBasePath}/${workoutId}`);
};

const createWorkoutSet = async (
  exerciseId: string,
  weight: number,
  repCount: number
) => {
  await httpClient().post(workoutSetsBasePath, {
    workoutExerciseId: exerciseId,
    usedWeight: weight,
    repNumber: repCount,
  });
};

const updateWorkoutSetById = async (
  workoutSetId: string,
  weight: number,
  repCount: number
) => {
  await httpClient().put(`${workoutSetsBasePath}/${workoutSetId}`, {
    id: workoutSetId,
    usedWeight: weight,
    repNumber: repCount,
  });
};

const deleteWorkoutSetById = async (setId: string) => {
  await httpClient().delete(`${workoutSetsBasePath}/${setId}`);
};

const getWorkoutSetById = async (workoutExerciseId: string) => {
  return await httpClient().get<any>(
    `${workoutSetsBasePath}/${workoutExerciseId}`
  );
};

export {
  getWorkoutExercises,
  createWorkoutExercise,
  deleteWorkoutExercisesById,
  createWorkout,
  deleteWorkoutById,
  createWorkoutSet,
  updateWorkoutSetById,
  deleteWorkoutSetById,
  getWorkoutSetById,
};
