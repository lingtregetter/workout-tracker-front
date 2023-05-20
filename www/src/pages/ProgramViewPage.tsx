import { FC, useContext, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import httpClient from "../services/http-client";
import { TrainingProgram } from "../interfaces/training-program";
import Loading from "../components/loading/Loading";
import OverviewRow from "../components/overview-row/OverviewRow";
import { useNavigate, useParams } from "react-router-dom";
import CreateWorkoutContext from "../stores/create-workout-context";
import Button from "../components/button/Button";
import ConfirmationModal from "../components/confirmationModal/ConfirmationModal";
import BlockModal from "../components/blockModal/BlockModal";

const ProgramViewPage: FC = () => {
  const [trainingProgram, setTrainingProgram] = useState<TrainingProgram>();
  const { programId } = useParams();
  const navigate = useNavigate();
  const context = useContext(CreateWorkoutContext);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);

  useEffect(() => {
    loadProgramBlocks();
  }, []);

  const loadProgramBlocks = async () => {
    try {
      const response = await httpClient().get<TrainingProgram>(
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

  const onYesClick = async () => {
    try {
      await httpClient().delete(`/v1/TrainingPrograms/${programId}`);

      navigate("/programs");
    } catch (e) {
      console.log(e);
    }
  };

  const onNoClick = () => {
    setIsConfirmationModalVisible(false);
  };

  return (
    <>
      <MainView title={trainingProgram?.programName ?? ""}>
        {trainingProgram ? (
          <>
            {trainingProgram.trainingBlocks.map((item) => (
              <OverviewRow
                hoverTitle={`Create workout with exercises to ${item.blockName}`}
                title={item.blockName}
                key={item.id}
                onArrowClick={() => onArrowClick(item.id)}
                onAddClick={() => onAddClick(item.id, item.blockName)}
              ></OverviewRow>
            ))}
            <div style={{ display: "flex", gap: "30px" }}>
              <Button
                text={"Add blocks"}
                onClick={() => setIsBlockModalVisible(true)}
                type={"outlined"}
                style={{ marginTop: "40px" }}
              ></Button>
              <Button
                text={"Delete program"}
                onClick={() => setIsConfirmationModalVisible(true)}
                type={"outlined"}
                style={{ marginTop: "40px" }}
              ></Button>
            </div>
            {isConfirmationModalVisible && (
              <ConfirmationModal
                onCancel={() =>
                  setIsConfirmationModalVisible((isVisible) => !isVisible)
                }
                onYesClick={onYesClick}
                onNoClick={onNoClick}
                title={`Are you sure you want to delete training program - ${trainingProgram.programName}?`}
                children={
                  "You cannot undo this move and all your data about this program will be lost!"
                }
              ></ConfirmationModal>
            )}
            {isBlockModalVisible && (
              <BlockModal
                onCancel={() => {
                  setIsBlockModalVisible((isVisible) => !isVisible);
                }}
                onSuccess={async () => {
                  await loadProgramBlocks();
                  setIsBlockModalVisible(false);
                }}
              ></BlockModal>
            )}
          </>
        ) : (
          <Loading />
        )}
      </MainView>
    </>
  );
};

export default ProgramViewPage;
