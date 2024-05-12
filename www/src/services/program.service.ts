import { TrainingProgram } from "../interfaces/domain-properties/training-program";
import httpClient from "./http-client";

const basePath = "/v1/TrainingPrograms";

const createTrainingProgram = async (
  programName: string,
  blocks: string[],
  programDescription?: string
) => {
  await httpClient(true).post(basePath, {
    programName: programName?.trim(),
    programDescription: programDescription,
    blocks: blocks,
  });
};

const getTrainingProgramById = async (programId?: string) => {
  return await httpClient().get<TrainingProgram>(`${basePath}/${programId}`);
};

const deleteTrainingProgram = async (programId?: string) => {
  await httpClient().delete(`${basePath}/${programId}`);
};

export { createTrainingProgram, getTrainingProgramById, deleteTrainingProgram };
