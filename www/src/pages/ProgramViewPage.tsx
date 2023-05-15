import { FC, useContext, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { TrainingProgram } from "../interfaces/training-program";
import Loading from "../components/loading/Loading";
import OverviewRow from "../components/overview-row/OverviewRow";
import { useNavigate, useParams } from "react-router-dom";
import CreateWorkoutContext from "../stores/create-workout-context";

const ProgramViewPage: FC = () => {
  const [trainingProgram, setTrainingProgram] = useState<TrainingProgram>();
  const { programId } = useParams();
  const navigate = useNavigate();
  const context = useContext(CreateWorkoutContext);

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

  const onAddClick = (blockId: string, blockName: string) => {
    context.trainingBlockId = blockId;
    context.blockName = blockName;
    navigate(`/workout/create`);
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
                onAddClick={() => onAddClick(item.id, item.blockName)}
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
