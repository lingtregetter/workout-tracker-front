import { createContext } from "react";

interface CreateWorkoutContext {
  trainingBlockId?: string;
  blockName?: string;
}

const CreateWorkoutContext = createContext<CreateWorkoutContext>({});

export default CreateWorkoutContext;
