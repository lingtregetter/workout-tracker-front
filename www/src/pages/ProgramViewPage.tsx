import { FC, useContext, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import { TrainingProgram } from "../interfaces/domain-properties/training-program";
import Loading from "../components/loading/Loading";
import OverviewRow from "../components/overview-row/OverviewRow";
import { useNavigate, useParams } from "react-router-dom";
import CreateWorkoutContext from "../stores/create-workout-context";
import Button from "../components/button/Button";
import ConfirmationModal from "../components/modals/confirmationModal/ConfirmationModal";
import BlockModal from "../components/modals/blockModal/BlockModal";
import {
  deleteTrainingProgram,
  getTrainingProgramById,
} from "../services/program.service";

const ProgramViewPage: FC = () => {
  const navigate = useNavigate();
  const context = useContext(CreateWorkoutContext);
  const { programId } = useParams();
  const [trainingProgram, setTrainingProgram] = useState<TrainingProgram>();
  // modal visibility
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);

  useEffect(() => {
    loadProgramBlocks();
  }, []);

  const loadProgramBlocks = async () => {
    try {
      const response = await getTrainingProgramById(programId);

      setTrainingProgram(response.data);
    } catch (e) {
      console.log(e);

      navigate("/programs");
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
      await deleteTrainingProgram(programId);
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
            <div style={{ display: "flex", gap: "30px", marginBottom: "10px" }}>
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
