import { FC } from "react";
import MainView from "../components/main-view/MainView";
import Button from "../components/button/Button";
import Title from "../components/title/Title";

const MyProgramsPage: FC = () => {
  return (
    <>
      <MainView title={"My programs"}>
        <Title title={"You don't have any programs yet!"} size={28}></Title>
        <Title title={"Create one here"} size={28}></Title>
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
