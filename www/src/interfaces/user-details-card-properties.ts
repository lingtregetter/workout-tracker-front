import { PersonalInformation } from "./domain-properties/personal-information";

export interface UserDetailsCardProperties {
  readonly personalInformation?: PersonalInformation;
  readonly onSuccess: () => Promise<void>;
}
