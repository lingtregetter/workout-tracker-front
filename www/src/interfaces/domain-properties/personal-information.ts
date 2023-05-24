import { UUID } from "crypto";

export interface PersonalInformation {
  readonly id: UUID;
  readonly gender: "Female" | "Male" | "Unknown";
  readonly height: number;
  readonly weight: number;
}
