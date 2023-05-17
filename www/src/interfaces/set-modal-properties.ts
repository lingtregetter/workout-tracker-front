export interface SetModalProperties {
  readonly onCancel: Function;
  readonly onSuccess: () => Promise<void>;
  readonly exerciseId: string;
  readonly exerciseName: string;
}
