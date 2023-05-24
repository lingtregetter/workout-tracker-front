import { FormEvent } from "react";

export interface LoginFormProperties {
  readonly onSubmit: (
    event: FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => Promise<void>;
}
