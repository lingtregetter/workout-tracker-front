import { CSSProperties, FC, useContext, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { TrainingBlock } from "../interfaces/training-block";
import Loading from "../components/loading/Loading";
import OverviewRow from "../components/overview-row/OverviewRow";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/title/Title";
import Button from "../components/button/Button";
import CreateWorkoutContext from "../stores/create-workout-context";
import ConfirmationModal from "../components/modals/confirmationModal/ConfirmationModal";

const TrainingBlockViewPage: FC = () => {
  const navigate = useNavigate();
  const context = useContext(CreateWorkoutContext);
  const { blockId } = useParams();
  const [trainingBlock, setTrainingBlock] = useState<TrainingBlock>();
  // modal visibility
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  useEffect(() => {
    loadBlockWorkouts();
  }, []);

  const loadBlockWorkouts = async () => {
    try {
      const response = await httpClient().get<TrainingBlock>(
        `/v1/TrainingBlocks/${blockId}`
      );

      setTrainingBlock(response.data);
    } catch (e) {
      console.log(e);

      navigate("/programs");
    }
  };

  const onArrowClick = (workoutId: string) => {
    navigate(`/workout/details/${workoutId}`);
  };

  const onButtonClick = (blockId: string, blockName: string) => {
    context.trainingBlockId = blockId;
    context.blockName = blockName;
    navigate(`/workout/create`);
  };

  const onYesClick = async () => {
    try {
      await httpClient().delete(`/v1/TrainingBlocks/${blockId}`);

      navigate(-1);
    } catch (e) {
      console.log(e);
    }
  };

  const onNoClick = () => {
    setIsConfirmationModalVisible(false);
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
          <>
            {trainingBlock.workouts.length === 0 ? (
              <>
                <Title
                  title={"You haven't created any workouts into the block yet!"}
                  size={28}
                ></Title>
                <div style={{ display: "flex", gap: "30px" }}>
                  <Button
                    text={"Create one here"}
                    onClick={() => {
                      onButtonClick(trainingBlock.id, trainingBlock.blockName);
                    }}
                    type={"secondary"}
                  ></Button>
                  <Button
                    text={"Delete block"}
                    onClick={() => setIsConfirmationModalVisible(true)}
                    type={"outlined"}
                  ></Button>
                </div>
              </>
            ) : (
              <>
                <div style={gridStyles}>
                  {trainingBlock.workouts.map((item) => (
                    <OverviewRow
                      title={`${item.workoutName}`}
                      key={item.id}
                      isAddBtnVisible={false}
                      onArrowClick={() => onArrowClick(item.id)}
                      onAddClick={() => {}}
                    >
                      {item.avPerformanceTime !== 0 && (
                        <div style={{ marginTop: "5px" }}>
                          Average performance time {item.avPerformanceTime}{" "}
                          minutes
                        </div>
                      )}
                    </OverviewRow>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "30px" }}>
                  <Button
                    text={"Add workout"}
                    onClick={() => {
                      onButtonClick(trainingBlock.id, trainingBlock.blockName);
                    }}
                    type={"outlined"}
                    style={{ marginTop: "40px" }}
                  ></Button>
                  <Button
                    text={"Delete block"}
                    onClick={() => setIsConfirmationModalVisible(true)}
                    type={"outlined"}
                    style={{ marginTop: "40px" }}
                  ></Button>
                </div>
              </>
            )}
            {isConfirmationModalVisible && (
              <ConfirmationModal
                onCancel={() =>
                  setIsConfirmationModalVisible((isVisible) => !isVisible)
                }
                onYesClick={onYesClick}
                onNoClick={onNoClick}
                title={`Are you sure you want to delete training block - ${trainingBlock.blockName}?`}
                children={
                  "You cannot undo this move and all your data about this block will be lost!"
                }
              ></ConfirmationModal>
            )}
          </>
        ) : (
          <Loading />
        )}
      </MainView>
    </>
  );
};

export default TrainingBlockViewPage;
