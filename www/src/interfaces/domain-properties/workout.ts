import { UUID } from "crypto";

export interface Workout {
  readonly id: UUID;
  readonly workoutName: string;
  readonly exercises: {
    readonly id: UUID;
    readonly exerciseName: string;
    readonly workoutExerciseId: string;
    readonly exerciseDescription?: string;
    readonly notes?: string;
    sets?: {
      readonly id: UUID;
      readonly repNumber: number;
      readonly usedWeight: number;
    }[];
  }[];
}
