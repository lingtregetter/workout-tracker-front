import { PersonalInformation } from "./personal-information";

export interface UserDetailsCardProperties {
  readonly personalInformation?: PersonalInformation;
  readonly onSuccess: () => Promise<void>;
}
