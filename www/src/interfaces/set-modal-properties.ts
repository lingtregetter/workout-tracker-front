export interface SetModalProperties {
  readonly onCancel: Function;
  readonly onSuccess: () => Promise<void>;
}
