export interface CreateProgramFormProperties {
  readonly onSubmit: (
    programName: string,
    blocks: string[],
    programDescription?: string
  ) => Promise<void>;
}
