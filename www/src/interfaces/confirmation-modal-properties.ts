import { ReactNode } from "react";

export interface ConfirmationModalProperties {
  readonly onCancel: Function;
  readonly onYesClick: Function;
  readonly onNoClick: Function;
  readonly title: string;
  readonly children?: ReactNode;
}
