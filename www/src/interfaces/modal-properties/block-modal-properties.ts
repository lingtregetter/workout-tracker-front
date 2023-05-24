import { ReactNode } from "react";

export interface BlockModalProperties {
  readonly onCancel: Function;
  readonly children?: ReactNode;
  readonly onSuccess: () => Promise<void>;
}
