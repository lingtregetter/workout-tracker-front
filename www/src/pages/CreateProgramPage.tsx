import { FC } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { useNavigate } from "react-router-dom";
import CreateProgramForm from "../components/create-program-form/CreateProgramForm";

const CreateProgramPage: FC = () => {
  const navigate = useNavigate();

  const onSubmit = async (
    programName: string,
    blocks: string[],
    programDescription?: string
  ) => {
    if (!programName || blocks.length === 0) return;

    try {
      await httpClient(true).post("/v1/TrainingPrograms", {
        programName: programName?.trim(),
        programDescription: programDescription,
        blocks: blocks,
      });
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
