import { CSSProperties, FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { TrainingBlock } from "../interfaces/training-block";
import Loading from "../components/loading/Loading";
import OverviewRow from "../components/overview-row/OverviewRow";

const TrainingBlockViewPage: FC = () => {
  const [trainingBlock, setTrainingBlock] = useState<TrainingBlock>();
  const blockId = "15c2ce24-f228-4e3b-99b8-fa59a9f50691";

  useEffect(() => {
    loadBlockWorkouts();
  }, []);

  const loadBlockWorkouts = async () => {
    try {
      const response = await httpClient.get<TrainingBlock>(
        `/v1/TrainingBlocks/${blockId}`
      );

      setTrainingBlock(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const gridStyles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "10px",
    width: "100%",
  };

  return (
    <>
      <MainView title={trainingBlock?.blockName ?? ""}>
        {trainingBlock ? (
          <div style={gridStyles}>
            {trainingBlock.workouts.map((item) => (
              <OverviewRow
                title={item.workoutName}
                key={item.id}
                isAddBtnVisible={false}
              ></OverviewRow>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </MainView>
    </>
  );
};

export default TrainingBlockViewPage;
