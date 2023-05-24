import { UUID } from "crypto";

export interface MuscleGroup {
  readonly id: UUID;
  readonly muscleName: string;
}
