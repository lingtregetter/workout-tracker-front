import { UUID } from "crypto";

export interface UserProgram {
  readonly id: UUID;
  readonly trainingProgramId: UUID;
  readonly trainingProgramName: string;
  readonly trainingProgramDescription?: string;
}
