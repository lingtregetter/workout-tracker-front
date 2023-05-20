import { ReactNode } from "react";

export interface OverviewRowProperties {
  readonly title: string;
  readonly isAddBtnVisible?: boolean;
  readonly isArrowBtnVisible?: boolean;
  readonly onArrowClick: Function;
  readonly onAddClick: Function;
  readonly children?: ReactNode;
  readonly hoverTitle?: string;
}
