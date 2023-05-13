import { FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { TrainingProgram } from "../interfaces/training-program";
import Loading from "../components/loading/Loading";
import OverviewRow from "../components/overview-row/OverviewRow";

const ProgramViewPage: FC = () => {
  const [trainingProgram, setTrainingProgram] = useState<TrainingProgram>();
  const programId = "466d5126-c5c4-4072-a232-cf223eeea1ee";

  useEffect(() => {
    loadProgramBlocks();
  }, []);

  const loadProgramBlocks = async () => {
    try {
      const response = await httpClient.get<TrainingProgram>(
        `/v1/TrainingPrograms/${programId}`
      );

      setTrainingProgram(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MainView title={trainingProgram?.programName ?? ""}>
        {trainingProgram ? (
          <>
            {trainingProgram.trainingBlocks.map((item) => (
              <OverviewRow title={item.blockName} key={item.id}></OverviewRow>
            ))}
          </>
        ) : (
          <Loading />
        )}
      </MainView>
    </>
  );
};

export default ProgramViewPage;
