export interface ButtonProperties {
  readonly text: string;
  readonly onClick: Function;
  readonly type: "primary" | "secondary" | "outlined";
}
