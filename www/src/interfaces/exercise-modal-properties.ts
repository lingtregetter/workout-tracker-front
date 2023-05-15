export interface ExerciseModalProperties {
  readonly onCancel: Function;
  readonly onSuccess: () => Promise<void>;
}
