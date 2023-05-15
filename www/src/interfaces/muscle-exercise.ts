import { UUID } from "crypto";

export interface MuscleExercise {
  readonly id: UUID;
  readonly musclGroupId: UUID;
  readonly muscleGroupName: string;
  readonly exercises: {
    readonly id: UUID;
    readonly exerciseName: string;
  }[];
}
