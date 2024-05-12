import { FC } from "react";
import MainView from "../components/main-view/MainView";
import { useNavigate } from "react-router-dom";
import CreateProgramForm from "../components/forms/create-program-form/CreateProgramForm";
import { createTrainingProgram } from "../services/program.service";

const CreateProgramPage: FC = () => {
  const navigate = useNavigate();

  const onSubmit = async (
    programName: string,
    blocks: string[],
    programDescription?: string
  ) => {
    if (!programName || blocks.length === 0) return;

    try {
      await createTrainingProgram(programName, blocks, programDescription);
      navigate("/programs");
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  return (
    <>
      <MainView title={"Create program"}>
        <CreateProgramForm onSubmit={onSubmit}></CreateProgramForm>
      </MainView>
    </>
  );
};

export default CreateProgramPage;
