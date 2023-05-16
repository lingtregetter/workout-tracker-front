import { FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import Button from "../components/button/Button";
import Title from "../components/title/Title";
import { UserProgram } from "../interfaces/user-program";
import OverviewRow from "../components/overview-row/OverviewRow";
import httpClient from "../services/http-client";
import { useNavigate } from "react-router-dom";

const MyProgramsPage: FC = () => {
  const [programsList, setProgramsList] = useState<UserProgram[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const response = await httpClient().get<UserProgram[]>(
        "/v1/UserPrograms"
      );

      setProgramsList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onArrowClick = (programId: string) => {
    navigate(`/programs/details/${programId}`);
  };

  const onCreateNewProgramClick = () => {
    navigate(`/programs/create`);
  };

  return (
    <>
      <MainView title={"My programs"}>
        {programsList.length === 0 ? (
          <>
            <Title title={"You don't have any programs yet!"} size={28}></Title>
            <Title title={"Create one here"} size={28}></Title>
          </>
        ) : (
          <>
            {programsList.map((item) => (
              <OverviewRow
                title={`${item.trainingProgramName} ${
                  item.trainingProgramDescription
                    ? " - " + item.trainingProgramDescription
                    : ""
                }`}
                key={item.id}
                isAddBtnVisible={false}
                onArrowClick={() => onArrowClick(item.trainingProgramId)}
                onAddClick={() => {}}
              ></OverviewRow>
            ))}
          </>
        )}
        <Button
          onClick={() => {
            onCreateNewProgramClick();
            console.log("create new program");
          }}
          text={"Create new program"}
          type={"secondary"}
        ></Button>
      </MainView>
    </>
  );
};

export default MyProgramsPage;
