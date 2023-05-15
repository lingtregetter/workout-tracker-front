import { createContext } from "react";

interface CreateWorkoutContext {
  trainingBlockId?: string;
}

const CreateWorkoutContext = createContext<CreateWorkoutContext>({});

export default CreateWorkoutContext;
