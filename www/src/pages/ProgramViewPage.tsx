import { FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { TrainingProgram } from "../interfaces/training-program";
import Loading from "../components/loading/Loading";
import OverviewRow from "../components/overview-row/OverviewRow";
import { useNavigate, useParams } from "react-router-dom";

const ProgramViewPage: FC = () => {
  const [trainingProgram, setTrainingProgram] = useState<TrainingProgram>();
  const { programId } = useParams();
  const navigate = useNavigate();

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

  const onArrowClick = (blockId: string) => {
    navigate(`/training-block/details/${blockId}`);
  };

  return (
    <>
      <MainView title={trainingProgram?.programName ?? ""}>
        {trainingProgram ? (
          <>
            {trainingProgram.trainingBlocks.map((item) => (
              <OverviewRow
                title={item.blockName}
                key={item.id}
                onArrowClick={() => onArrowClick(item.id)}
              ></OverviewRow>
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
