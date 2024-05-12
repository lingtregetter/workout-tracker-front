import { MuscleExercise } from "../interfaces/domain-properties/muscle-exercise";
import { MuscleGroup } from "../interfaces/domain-properties/muscle-group";
import { TrainingBlock } from "../interfaces/domain-properties/training-block";
import httpClient from "./http-client";

const trainingBlocksBasePath = "/v1/TrainingBlocks";

const createTrainingBlocks = async (programId: string, blocks: string[]) => {
  await httpClient(true).post(trainingBlocksBasePath, {
    trainingProgramId: programId,
    blocks: blocks,
  });
};

const getTrainingBlockById = async (blockId: string) => {
  return await httpClient().get<TrainingBlock>(
    `${trainingBlocksBasePath}/${blockId}`
  );
};

const deleteTrainingBlockById = async (blockId: string) => {
  await httpClient().delete(`${trainingBlocksBasePath}/${blockId}`);
};

const getMuscleGroups = async () => {
  return await httpClient().get<MuscleGroup[]>(`/v1/MuscleGroups`);
};

const createExercise = async (
  exerciseName: string,
  exerciseDescription: string,
  muscleGroupIds: string[]
) => {
  await httpClient().post("/v1/Exercises", {
    exerciseName,
    exerciseDescription,
    muscleGroupIds,
  });
};

const getExerciseMuscles = async () => {
  return await httpClient().get<MuscleExercise[]>(`/v1/ExerciseMuscles`);
};

export {
  createTrainingBlocks,
  getTrainingBlockById,
  deleteTrainingBlockById,
  getMuscleGroups,
  createExercise,
  getExerciseMuscles,
};
