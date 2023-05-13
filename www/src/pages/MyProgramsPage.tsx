import { FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import Button from "../components/button/Button";
import Title from "../components/title/Title";
import { UserProgram } from "../interfaces/user-program";
import OverviewRow from "../components/overview-row/OverviewRow";
import httpClient from "../services/http-client";

const MyProgramsPage: FC = () => {
  const [programsList, setProgramsList] = useState<UserProgram[]>([]);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const response = await httpClient.get<UserProgram[]>("/v1/UserPrograms");

      setProgramsList(response.data);
    } catch (e) {
      console.log(e);
    }
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
              ></OverviewRow>
            ))}
          </>
        )}
        <Button
          onClick={() => {
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
