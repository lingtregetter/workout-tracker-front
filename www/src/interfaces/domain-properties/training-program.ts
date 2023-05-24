import { UUID } from "crypto";

export interface TrainingProgram {
  readonly id: UUID;
  readonly programName: string;
  readonly programDescription?: string;
  readonly trainingBlocks: {
    readonly id: UUID;
    readonly blockName: string;
  }[];
}
