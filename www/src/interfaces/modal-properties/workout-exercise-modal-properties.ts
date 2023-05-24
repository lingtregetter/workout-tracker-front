export interface WorkoutExerciseModalProperties {
  readonly onCancel: Function;
  readonly onSuccess: () => Promise<void>;
  readonly workoutId: string;
}
