import { ReactNode } from "react";

export interface SetModalProperties {
  readonly onCancel: Function;
  readonly onSuccess: () => Promise<void>;
  readonly exerciseId: string;
  readonly exerciseName: string;
  readonly title: string;
  readonly children?: ReactNode;
  readonly existingWorkoutSet?: {
    readonly id: string;
    readonly repAmount: number;
    readonly usedWeight: number;
  };
}
