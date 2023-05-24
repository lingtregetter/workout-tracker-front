import { FormEvent } from "react";

export interface RegisterFormProperties {
  readonly onSubmit: (
    event: FormEvent<HTMLFormElement>,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
}
