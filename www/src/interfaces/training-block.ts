import { UUID } from "crypto";

export interface TrainingBlock {
  readonly id: UUID;
  readonly blockName: string;
  readonly workouts: {
    readonly id: UUID;
    readonly workoutName: string;
    readonly avPerformanceTime: number;
  }[];
}
